from flask import Blueprint, redirect, render_template, request, jsonify, flash, session, g, url_for
from functools import wraps

from flackt import socket


auth = Blueprint('access', __name__, url_prefix='/access')



@auth.route('/addname', methods=['POST'])
def sign_in():
    print('Signing in')    
    from flackt.views.channel_logic import users, User
    print('users', users)
    name = request.form.get('display-name')    
    if name == ""  or name.isspace():
        return jsonify({"success": False, "message": "Please enter display name"})

    elif name in users.keys():
        print('name', name)
        
        return jsonify({"success": False, "message": f"Display name {name} exists"})
    
    users[name] = User(name)
    print('users updated', users)
    session['current_user'] = name
    print('Current user', name)
    socket.emit('connected', {'message': f'{name} is connected'})
    return jsonify({"success": True, "displayName": name})        


@auth.route('/user')
def authenticate_user():
    return render_template('index.html')

@auth.route('/current_user/<string:user_name>', methods=['POST']) 
def resume_session(user_name):
    from flackt.views.channel_logic import users, User
    print('users', users.keys())
    if user_name in users.keys():
        session['current_user'] = user_name
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": f"Username {user_name} doesn't exist"})
    
@auth.before_app_request
def get_user():
    if session.get('current_user', None):
        g.user_name = session['current_user']
    if session.get('current_channel', None):
        g.current_channel = session['current_channel']