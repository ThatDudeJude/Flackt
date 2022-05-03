from cgi import test

from flask import session


def test_user_missing_name(test_client):
    with test_client:
        result = test_client.post('/access/addname', data={'display-name': ""})        
        assert b'false' in result.data
        assert b'Please enter display name' in result.data

def test_existing_user_name(test_client, active_user_one):
    with test_client:
        active_user_one.logged_in_user()
        assert session['current_user'] == 'Test Client One'
        result = test_client.post('/access/addname', data={'display-name': "Test Client One"})        
        assert b'false' in result.data
        assert b'Display name Test Client One exists' in result.data

def test_user_access(test_client, active_user_one):        
    with test_client:        
        user  = active_user_one.logged_in_user()
        from flackt.views.channel_logic import users
        print('user: ', user.data)
        print('test_users', users)    
        assert 'Test Client One' in users.keys()
        assert users['Test Client One'].name == 'Test Client One'
        assert  b'true' in  user.data
    