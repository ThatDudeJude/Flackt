from datetime import date
from datetime import datetime


users = {}
all_channels_info = {}
channels = {}



class ChannelData() :
    
    def __init__(self, channel_name, channel_topic, channel_description, channel_creator):
        self.name = channel_name     
        self.topic = channel_topic
        self.description = channel_description
        self.creator = channel_creator
        self.texts = []
        self.text_counter = 0
        self.current = False
        self.members = []

    def check_current(self, channel = ''):
        if channel:
            self.current =  channel == self.name       
    def add_member(self, member):
        self.members.append(member)
    def add_text(self, text):
        # if len(self.texts) == 100:
        #     self.texts = {}
        #     self.text_counter = 0
        # self.texts[str(self.text_counter)] = text
        # self.text_counter += 1
        self.texts.insert(0, text)

    def get_channel_data(self):
        return {'channelName': self.name, 'channelTopic': self.topic, 'channelDescription': self.description, "channelMembers":self.members,  "current": self.current}

    def get_channel_info(self):
        return {'channelName': self.name, 'channelTopic': self.topic, 'channelDescription': self.description, "channelMembers":self.members, "totalMembers": len(self.members)}        

class User():
    
    def __init__(self, name):
        self.name = name 
        self.member_channels = set()
    def add_as_member(self, channel_name):
        self.member_channels.add(channel_name)
    def get_member_channels(self):
        return self.member_channels
    def get_non_member_channels(self, all_channels):
        return list(all_channels-self.member_channels)

class Text():
    
    def __init__(self, sender, text):
        self.name = sender        
        self.text = text
        self.time = datetime.now()
        self.text_time = ''
    

    def get_text(self):
        exact_time = self.time
        days_past = datetime.now() - exact_time
        if days_past.days > 0:
            self.text_time = exact_time.strftime("%H:%M %A %B")+ " %d"%exact_time.year
        else: 
            self.text_time = exact_time.strftime("%H:%M")

        return {"name": self.name, "text_time": self.text_time, "text": self.text}


texts = [{"name": "Chrome", "date": "18:00 1 Fri 2021", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet totam? Quisquam, facilis commodi."},
        {"name": "Chrome", "date": "18:00 2 Fri 2021", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet totam? Quisquam, facilis commodi."}, 
        {"name": "Firefox", "date": "18:00 3 Fri 2021", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet totam? Quisquam, facilis commodi."}, 
        {"name": "Chrome", "date": "18:00 4 Fri 2021", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet totam? Quisquam, facilis commodi."}, 
        {"name": "Firefox", "date": "18:00 5 Fri 2021", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet totam? Quisquam, facilis commodi."},
        {"name": "Firefox", "date": "18:00 6 Fri 2021", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet totam? Quisquam, facilis commodi."},
        {"name": "Chrome", "date": "18:00 7 Fri 2021", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet totam? Quisquam, facilis commodi."},
        {"name": "Chrome", "date": "18:00 8 Fri 2021", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet totam? Quisquam, facilis commodi."}, 
        {"name": "Firefox", "date": "18:00 9 Fri 2021", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet totam? Quisquam, facilis commodi."}, 
        {"name": "Chrome", "date": "18:00 10 Fri 2021", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quo eveniet totam? Quisquam, facilis commodi."}
        ]

firstChannel = ChannelData('First Channel', 'Being First', "How this became the first channel", 'First')
firstChannel.add_member('First')
firstChannel.add_member('Second')
firstChannel.add_member('Third')

secondChannel = ChannelData('Second Channel', 'Being Second', "Runner's up ain't so bad", 'Second')
secondChannel.add_member('First')
secondChannel.add_member('Second')
secondChannel.add_member('Third')

thirdChannel = ChannelData('Third Channel', 'Being Third', "Being first after second", 'Third')
thirdChannel.add_member('First')
thirdChannel.add_member('Fourth')
thirdChannel.add_member('Third')

fourthChannel = ChannelData('Fourth Channel', 'Being Fourth', "Closest to third", 'Fourth')
fourthChannel.add_member('First')
fourthChannel.add_member('Second')
fourthChannel.add_member('Third')
fourthChannel.add_member('Fourth')

fourthChannelText = Text("Joined", "Fourth Created this channel")
fourthChannel.add_text(fourthChannelText)
secondChannelText = Text("Joined", "Second Created this channel")
secondChannel.add_text(secondChannelText)
firstChannelText = Text("Joined", "First Created this channel")
firstChannel.add_text(firstChannelText)
thirdChannelText = Text("Joined", "Third Created this channel")
thirdChannel.add_text(thirdChannelText)


for text in texts:
    fourthChannelText = Text(text["name"], text['text'])
    fourthChannel.add_text(fourthChannelText)
    secondChannelText = Text(text["name"], text['text'])
    secondChannel.add_text(secondChannelText)


all_channels_info = {"First Channel": firstChannel.get_channel_info(),
        "Second Channel": secondChannel.get_channel_info(), 
        "Third Channel": thirdChannel.get_channel_info(),
        "Fourth Channel": fourthChannel.get_channel_info()}

channels = {"First Channel": firstChannel,
        "Second Channel": secondChannel, 
        "Third Channel": thirdChannel,
        "Fourth Channel": fourthChannel}        