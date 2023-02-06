

def test_client_connection(socketio_client, active_user_one):    
    active_user_one.logged_in_user()
    received = socketio_client.get_received()
    print('received', received)
    assert received[0]['name'] == 'connected'
    assert received[0]['args'][0]['message'] == 'Test Client One is connected'
    assert received[0]['namespace'] == '/'

def test_joining_and_leaving_room(socketio_client, active_user_one, test_client):            
    active_user_one.created_channel()
    received = socketio_client.get_received()    
    assert received[0]['name'] == 'connected'
    socketio_client.emit('join', 'TestClientChannel')
    received = socketio_client.get_received()
    print('received',received)    
    assert received[0]['name'] == 'Joined Room'
    assert received[0]['args'][0]['message'] == 'Joined TestClientChannel room'
    socketio_client.emit('leave', 'TestClientChannel')
    received = socketio_client.get_received()
    print('received',received)    
    assert received[0]['name'] == 'Left Room'
    assert received[0]['args'][0]['message'] == 'Left TestClientChannel room'



def test_text_submission(socketio_client, active_user_one):
    active_user_one.created_channel()
    received = socketio_client.get_received()    
    assert received[0]['name'] == 'connected'
    socketio_client.emit('join', 'TestClientChannel')
    received = socketio_client.get_received()
    print('received',received)    
    assert received[0]['name'] == 'Joined Room'
    assert received[0]['args'][0]['message'] == 'Joined TestClientChannel room'
    socketio_client.emit('submit text', {'name': 'Test Client One', 'text': 'Hello'})
    received = socketio_client.get_received()
    print('received', received)
    assert received[0]['name'] == 'broadcast text'
    assert received[0]['args'][0]['name'] == 'Test Client One'
    assert received[0]['args'][0]['text'] == 'Hello'
    from flackt.views.channel_logic import channels
    assert "TestClientChannel" in channels.keys()
    assert "Hello" in channels['TestClientChannel'].texts[0].get_text()['text']


def test_inaccessible_room(socketio_client, active_user_one, test_client):            
    active_user_one.created_channel()
    received = socketio_client.get_received()    
    assert received[0]['name'] == 'connected'
    socketio_client.emit('join', 'TestClientChannel')
    received = socketio_client.get_received()
    print('received',received)    
    assert received[0]['name'] == 'Joined Room'
    assert received[0]['args'][0]['message'] == 'Joined TestClientChannel room'
    from conftest import socket
    socket.close_room('TestClientChannel')
    socketio_client.emit('submit text', {'name': 'Test Client One', 'text': 'Hello'})
    received = socketio_client.get_received()
    print('received',received)    
    assert len(received) == 0
    