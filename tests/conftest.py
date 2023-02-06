from flackt import create_app
from flackt import socket
import flackt.views.channel_logic
from flask import session
import pytest

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import Select


display_name = ""
first_channel_name = ""
channel_name_after_login = ""
description_button_index = 0


@pytest.fixture(scope="function")
def app():
    instance_in = {"prod": False, "test": True, "dev": False}
    app = create_app(instance_in)

    yield app
    print("updated", flackt.views.channel_logic.users)
    flackt.views.channel_logic.all_channels_info = {}
    flackt.views.channel_logic.channels = {}
    flackt.views.channel_logic.users = {}


@pytest.fixture(scope="function")
def test_client(app):
    return app.test_client()


@pytest.fixture(scope="function")
def socketio_client(app, test_client):
    socket_test_client = socket.test_client(app, flask_test_client=test_client)
    return socket_test_client


class ActiveUserOne(object):
    def __init__(self, client):
        self.client = client

    def logged_in_user(self):
        user = self.client.post(
            "/access/addname", data={"display-name": "Test Client One"}
        )
        return user

    def created_channel(
        self,
        channel_data={
            "name": "TestClientChannel",
            "creator": "Test Client One",
            "topic": "TestingOne",
            "description": "Nothing but testing",
        },
    ):
        self.logged_in_user()
        return self.client.post(
            "/chan/create",
            data={
                "channel_creator": channel_data["creator"],
                "channel_name": channel_data["name"],
                "channel_topic": channel_data["topic"],
                "channel_description": channel_data["description"],
            },
        )


class ActiveUserTwo(object):
    def __init__(self, client):
        self.client = client

    def logged_in_user(self):
        user = self.client.post(
            "/access/addname", data={"display-name": "Test Client Two"}
        )
        return user

    def joined_channel(self, channel_name="TestClientChannel"):
        user_one = ActiveUserOne(self.client)
        user_one.logged_in_user()
        user_one.created_channel()
        self.logged_in_user()
        return self.client.post(f"/chan/join/{channel_name}")


@pytest.fixture(scope="function")
def active_user_one(test_client):
    return ActiveUserOne(test_client)


@pytest.fixture(scope="function")
def active_user_two(test_client):
    return ActiveUserTwo(test_client)


class ClientInterface:
    def __init__(self, driver, uri):
        self.driver = driver
        # driver = webdriver.Chrome()
        self.driver.get(uri)
        self.driver.execute_script("window.localStorage.clear()")

    def get_driver(self):
        return self.driver

    def login(self):
        displayName = display_name
        wait = WebDriverWait(self.driver, 5)
        login_input = wait.until(EC.presence_of_element_located((By.ID, "displayName")))
        accept_btn = self.driver.find_element(By.XPATH, "//input[@value='Accept']")
        actions = ActionChains(self.driver)
        login_input.clear()
        time.sleep(3.0)
        login_input.send_keys(displayName)
        time.sleep(3.0)
        actions.move_to_element(accept_btn)
        actions.click(accept_btn)
        actions.perform()
        time.sleep(3.0)
        return self.driver.page_source

    def create_first_channel(
        self, topic="Created Channels", description="Client Experience"
    ):
        name = first_channel_name
        wait = WebDriverWait(self.driver, 10)
        create_channel_btn = wait.until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, "button#new-user-create-channel")
            )
        )
        time.sleep(5.0)
        create_channel_btn.click()
        self.create_channel(name, topic, description)
        return self.driver.page_source

    def create_channel(self, name, topic, description):
        wait = WebDriverWait(self.driver, 10)
        channel_name = wait.until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "input#channel-name"))
        )
        time.sleep(2.0)

        channel_topic = self.driver.find_element(By.CSS_SELECTOR, "input#channel-topic")
        channel_description = self.driver.find_element(
            By.CSS_SELECTOR, "textarea#channel-description"
        )
        channel_create = self.driver.find_element(
            By.XPATH, "//input[@type='submit'][@value='Add Channel']"
        )

        channel_name.clear()
        channel_topic.clear()
        channel_description.clear()

        channel_name.send_keys(name)
        time.sleep(2.0)
        channel_topic.send_keys(topic)
        time.sleep(2.0)
        channel_description.send_keys(description)
        time.sleep(2.0)
        actions = ActionChains(self.driver)
        actions.move_to_element(channel_create)
        time.sleep(3.0)
        actions.click(channel_create)
        actions.perform()

    def toggle_group_information(self):
        wait = WebDriverWait(self.driver, 5)
        try:
            switch = wait.until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, "div.toggle"))
            )
        except:
            switch = wait.until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, "div#group-btn"))
            )
        switch.click()
        time.sleep(3.5)
        return self.driver.page_source

    def send_group_text(self, text):
        send_text = self.driver.find_element(
            By.XPATH, "//button[@type='submit'][@id='send-button']"
        )
        text_box = self.driver.find_element(
            By.XPATH, "//div[@role='textbox'][@id='textbox']"
        )
        time.sleep(2.9)
        text_box.clear()

        text_box.send_keys(text)
        time.sleep(2.0)
        send_text.click()
        time.sleep(2.0)
        return self.driver.page_source

    def create_channel_after_login(
        self, topic="Other Channels", description="More Channels"
    ):
        name = channel_name_after_login
        try:
            self.click_nav()
            create_channel_btn = self.driver.find_element(
                By.XPATH, "//button[@id='nav-create-channel']"
            )
        except:
            create_channel_btn = self.driver.find_element(
                By.XPATH, "//button[@id='nav-create-channel']"
            )

        finally:
            time.sleep(2.0)
            action = ActionChains(self.driver)
            action.move_to_element(create_channel_btn)
            time.sleep(2.0)
            action.click(create_channel_btn)
            action.perform()

            time.sleep(2.0)

            self.create_channel(name, topic, description)
            time.sleep(2.0)
            return self.driver.page_source

    def select_channel(self):
        channel_name = first_channel_name
        nav_open = False
        try:
            self.click_nav()
            nav_open = True
        finally:
            wait = WebDriverWait(self.driver, 10)
            channel_selection = wait.until(
                EC.visibility_of_element_located(
                    (By.XPATH, "//form[@id='select-channel-displayed']/select[1]")
                )
            )
            time.sleep(2.0)

            select = Select(channel_selection)
            select.select_by_visible_text(f"{channel_name}")
            if nav_open:
                self.click_nav()
            time.sleep(2.5)
            return self.driver.page_source

    def join_channel_after_login(self):
        nav_open = False
        try:
            self.click_nav()
            nav_open = True
            join_channel_btn = self.driver.find_element(
                By.XPATH, "//button[@id='nav-join-channel']"
            )
        except:
            join_channel_btn = self.driver.find_element(
                By.XPATH, "//button[@id='nav-join-channel']"
            )
        finally:

            time.sleep(2.0)

            action = ActionChains(self.driver)
            action.move_to_element(join_channel_btn)
            time.sleep(2.0)
            action.click(join_channel_btn)
            action.perform()

            time.sleep(2.5)
            self.join_channel()
            time.sleep(2.0)
            return self.driver.page_source

    def join_channel(self, name="Flackt Channel"):
        time.sleep(2.5)
        wait = WebDriverWait(self.driver, 10)
        description_btns = wait.until(
            EC.visibility_of_all_elements_located(
                (By.CSS_SELECTOR, "button.description-btn")
            )
        )
        print("description", description_btns)
        description_btn = description_btns[description_button_index]
        time.sleep(1.5)
        action = ActionChains(self.driver)
        action.move_to_element(description_btn)
        action.click(description_btn)
        action.perform()

        wait = WebDriverWait(self.driver, 5)
        joining_channel_button = wait.until(
            EC.visibility_of_element_located(
                (By.XPATH, f"//button[@data-channel='{name}']")
            )
        )
        time.sleep(1.5)
        action = ActionChains(self.driver)
        action.move_to_element(joining_channel_button)
        action.click(joining_channel_button)
        action.perform()

    def click_nav(self):
        nav = self.driver.find_element(By.CSS_SELECTOR, "div#nav-hamburger")
        nav.click()
        time.sleep(4.0)


@pytest.fixture(params=["firefox", "chrome"], scope="function")
def client_ui(request):
    global display_name, first_channel_name, channel_name_after_login, description_button_index
    if request.param == "chrome":
        driver = webdriver.Chrome()
        display_name = "Test Client Chrome"
        first_channel_name = "Chrome First"
        channel_name_after_login = "Chrome Second"

    elif request.param == "firefox":
        driver = webdriver.Firefox()
        display_name = "Test Client Firefox"
        first_channel_name = "Firefox First"
        channel_name_after_login = "Firefox Second"
    driver.implicitly_wait(5)
    yield ClientInterface(driver, "http://127.0.0.1:5000/")
    description_button_index += 2
    # driver.close()
    driver.execute_script("window.localStorage.clear()")
    driver.quit()
