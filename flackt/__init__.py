from flask import Flask, render_template
from config import *
from flask_socketio import SocketIO
import os

socket = SocketIO()


def create_app(instance_in={"prod": False, "test": False, "dev": True}):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_pyfile("config.py")
    if instance_in["prod"]:
        app.config.from_object(ProductionConfig())
        app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    elif instance_in["test"]:
        app.config.from_object(TestingConfig())
    else:
        app.config.from_object(Config())

    @app.route("/")
    def index():
        return render_template("index.html")

    from .views.auth import auth

    app.register_blueprint(auth)

    from .views.channels import chan

    app.register_blueprint(chan)

    socket.init_app(app)

    return app
