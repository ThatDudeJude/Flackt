from ntpath import join
from unicodedata import name
from flask import (
    Blueprint,
    jsonify,
    g,
    redirect,
    request,
    url_for,
    render_template,
    session,
)
from flackt.views.channel_logic import ChannelData, Text
from flackt import socket
from flask_socketio import emit, join_room, leave_room
import time


chan = Blueprint("channels", __name__, url_prefix="/chan")

active_rooms = {}


def add_new_channel(name, topic, description, creator):
    from flackt.views.channel_logic import all_channels_info, channels

    channel = ChannelData(name, topic, description, creator)
    channel.add_member(creator)
    all_channels_info[channel.name] = channel.get_channel_info()
    channels[channel.name] = channel
    # print('all_channels_info', all_channels_info)
    return channel


@chan.route("/<string:channel_name>")
def load_channel(channel_name):
    return render_template("index.html")


@chan.route("/")
def channel():
    return render_template("index.html")


@chan.route("/show/<string:channel_name>", methods=["POST"])
def getChannel(channel_name):
    from flackt.views.channel_logic import channels

    channel = channels[channel_name]
    channel_data = channel.get_channel_data()
    print("channelData", channel.get_channel_data())
    return jsonify({"success": True, "channelData": channel_data})


@chan.route("/create", methods=["POST"])
def create_channel():
    from flackt.views.channel_logic import all_channels_info, users

    channel_creator = request.form.get("channel_creator")
    channel_name = request.form.get("channel_name")
    channel_topic = request.form.get("channel_topic")
    channel_description = request.form.get("channel_description")
    error = False
    message = ""

    if (
        channel_name == ""
        or channel_topic == ""
        or channel_description == ""
        or channel_name.isspace()
        or channel_topic.isspace()
        or channel_description.isspace()
    ):
        error = True
        message = "Please fill in all fields"
    elif channel_name in all_channels_info:
        error = True
        message = "Channel name already taken"
    if not error:
        users[g.user_name].add_as_member(channel_name)
        channel = add_new_channel(
            channel_name, channel_topic, channel_description, channel_creator
        )
        text = Text("Joined", f"{g.user_name} created this channel.")
        channel.add_text(text)
    else:
        return jsonify({"success": False, "message": message})

    return jsonify({"success": True, "newChannel": channel.get_channel_data()})


@chan.route("/join/<string:channel_name>", methods=["POST"])
def join_channel(channel_name):
    from flackt.views.channel_logic import channels, users

    channel = channels[channel_name]
    channel.add_member(g.user_name)
    print("users joining", users)
    users[g.user_name].add_as_member(channel_name)
    # print('channel', channel)
    return jsonify({"success": True, "joinedChannel": channel.get_channel_data()})


# @chan.route('/')


@chan.route("/list/<string:type>", methods=["POST"])
def get_channels(type):
    from flackt.views.channel_logic import all_channels_info, users

    if type == "all":
        channels_list = all_channels_info
        # print("channelsList", channels_list)
    else:
        all_channels_info_names = set(all_channels_info.keys())
        channels_list = {}
        if type == "member":
            member = users[g.user_name].get_member_channels()
            for channel in member:
                channels_list[channel] = all_channels_info[channel]
        if type == "non-member":
            non_member = users[g.user_name].get_non_member_channels(
                all_channels_info_names
            )
            for channel in non_member:
                channels_list[channel] = all_channels_info[channel]
    return jsonify({"success": True, "allChannels": channels_list})


# texts = []


@chan.route("/posts/<string:channel_name>", methods=["POST"])
def get_posts(channel_name):
    from flackt.views.channel_logic import channels

    start = int(request.form.get("start")) - 1
    end = int(request.form.get("end")) - 1

    texts = channels[channel_name].texts
    if len(texts) == 1 and start == 0:
        print("One text", texts[start].get_text())
        return jsonify({"success": True, "texts": [texts[start].get_text()]})

    if start > len(texts) - 1:
        return jsonify({"success": True, "texts": False})

    if end > len(texts) - 1:
        end = len(texts) - 1

    send_texts = []

    for i in range(start, end + 1):
        send_texts.append(texts[i].get_text())

    # print('send_texts', send_texts)

    return jsonify({"success": True, "texts": send_texts})


@socket.on("submit text", namespace="/")
def add_text(text_data):
    from flackt.views.channel_logic import channels

    sent_text = Text(text_data["name"], text_data["text"])
    print("current_channel", session["current_channel"])
    channels[session["current_channel"]].add_text(sent_text)
    text = sent_text.get_text()
    print("text_data", text)
    emit("broadcast text", text, to=session["current_channel"], broadcast=True)


@socket.on("join", namespace="/")
def joining_channel(channel_name):
    session["current_channel"] = channel_name
    join_room(channel_name)
    emit("Joined Room", {"message": f"Joined {channel_name} room"})


@socket.on("leave", namespace="/")
def leaving_channel(channel_name):
    leave_room(channel_name)
    emit("Left Room", {"message": f"Left {channel_name} room"})


# @socket.on('join', namespace='/live')
# def joining_channel(channel_name):
#     session['current_channel'] = channel_name

#     if channel_name in active_rooms.keys():
#         active_rooms[channel_name].append(session['current_user'])
#     else:
#         active_rooms[channel_name] = [session['current_user']]
#     join_room(channel_name)
#     emit('Joined Room', {'members': f"{active_rooms[channel_name]}", "isLive": True}, to=channel_name, broadCast=True)

# @socket.on('get joined', namespace='/live')
# def joining_channel(channel_name):
#     leave_room(channel_name)
#     time.sleep(1)
#     join_room(channel_name)
#     emit('Joined Room', {'memberName': f"{session['current_user']}", "isLive": True}, to=request.sid)


@socket.on("join", namespace="/live")
def joining_channel(channel_name):
    if channel_name in active_rooms.keys():
        active_rooms[channel_name].append(session["current_user"])
    else:
        active_rooms[channel_name] = [session["current_user"]]
    emit(
        "Joined Room",
        {"memberName": f"{session['current_user']}", "isLive": True},
        to=channel_name,
        broadcast=True,
    )
    join_room(channel_name)
    print("liveMembers", active_rooms[channel_name])
    emit("Update Live", {"liveMembers": active_rooms[channel_name]}, to=request.sid)


@socket.on("leave", namespace="/live")
def leaving_channel(channel_name):
    if channel_name in active_rooms.keys():
        active_rooms[channel_name].remove(session["current_user"])
    emit(
        "Left Room",
        {"memberName": f"{session['current_user']}", "isLive": False},
        to=channel_name,
        include_self=False,
    )
    leave_room(channel_name)


@socket.on("disconnect", namespace="/live")
def leaving_channel():
    channel_name = session["current_channel"]
    active_rooms[channel_name].remove(session["current_user"])
    emit(
        "Left Room",
        {"memberName": f"{session['current_user']}", "isLive": False},
        to=channel_name,
    )
    leave_room(channel_name)


# @chan.before_app_request
# def get_user():
#     if session.get('current_user', None):
#         g.user_name = session['current_user']
#     if session.get('current_channel', None):
#         g.current_channel = session['current_channel']
