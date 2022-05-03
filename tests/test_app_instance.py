from flackt import create_app

def test_app_client(test_client):    
    assert not create_app().testing
    instance_in = {'prod': False, "test":True, "dev": False}
    assert create_app(instance_in).testing


def test_index_page(test_client):
    response = test_client.get('/')
    print('response', response)
    assert response.status == '200 OK'
    assert b'index.js' in response.data