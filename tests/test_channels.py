from flask import session

import pytest

def test_channel_creation(test_client, active_user_one):
    with test_client:
        result = active_user_one.created_channel()
        assert session['current_user'] == 'Test Client One'        
        from flackt.views.channel_logic import channels
        assert "TestClientChannel" in channels.keys()
        assert "Test Client One created this channel." in channels['TestClientChannel'].texts[0].get_text()['text']
        assert b"TestClientChannel" in result.data
        assert b'Test Client One' in result.data
        assert b'TestingOne' in result.data
        assert b'Nothing but testing' in result.data


@pytest.mark.parametrize(('channel_creator', 'channel_name', 'channel_topic', 'channel_description', 'message'),(
    ('Wrong creator', '', 'Wrong topic', 'Wrong description', b'Please fill in all fields'), 
    # ('', 'Wrong name', 'Wrong topic', 'Wrong description', b'Please fill in all fields'), 
    ('Wrong creator', 'Wrong name', '', 'Wrong description', b'Please fill in all fields'),
    ('Wrong creator', 'Wrong name', 'Wrong topic', '', b'Please fill in all fields')
    ))

def test_channel_missing_information(channel_creator, channel_name, channel_topic, channel_description, message, test_client, active_user_one):    
    with test_client:
        result = active_user_one.created_channel({
                'creator': channel_creator,
                'name': channel_name, 
                'topic': channel_topic,
                'description': channel_description
            })
        print('result', result.data)
        assert session['current_user'] == 'Test Client One'            

        assert message in result.data


def test_join_channel(active_user_two, test_client):
    with test_client:        
        result = active_user_two.joined_channel()        
        from flackt.views.channel_logic import channels, users 
        print('users_chan', users)
        assert 'Test Client Two' in channels['TestClientChannel'].members
        assert b'Test Client Two' in result.data
    
