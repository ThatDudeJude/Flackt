
def test_client_ui(client_ui):
    source = client_ui.get_driver().page_source
    assert "Accept" in source
    assert "Enter Your Flackt Display Name" in source

    source = client_ui.login()
    assert "Join Channel" in source 
    assert "Create Channel" in source

    source = client_ui.create_first_channel()
    assert "Channel Name" in source
    assert "Topic" in source
    assert "Description" in source
    assert "Add Channel" in source
    
    source = client_ui.toggle_group_information()

    assert "First" in source
    assert "Created Channels" in source
    assert "Client Experience" in source    
    assert "Live" in source
    # assert "Hide channel info" in source

    source = client_ui.toggle_group_information()        
    assert "Show channel info" in source

    source = client_ui.send_group_text("Hi everyone. Welcome to my channel.")    
    assert "Hi everyone. Welcome to my channel." in source


    source = client_ui.create_channel_after_login()

    assert "Second" in source
    assert "Other Channels" in source
    assert "More Channels" in source

    source = client_ui.join_channel_after_login()
    assert "Flackt Channel" in source

    source = client_ui.send_group_text("Hello everyone.")  
    assert "Hello everyone." in source  

    source = client_ui.select_channel()
    assert "First" in source
    assert "Created Channels" in source
    assert "Client Experience" in source