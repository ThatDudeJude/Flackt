from flask import Flask, render_template
from config import *
from flask_socketio import SocketIO
import os
import logging
from logging.handlers import RotatingFileHandler
from flask.logging import default_handler

socket = SocketIO()


def create_app(instance_in={"prod": False, "test": False, "dev": True}):
    app = Flask(__name__, instance_relative_config=True)
    # app.config.from_pyfile("config.py")
    if instance_in["prod"]:
        app.config.from_object(ProductionConfig())
        app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    elif instance_in["test"]:
        app.config.from_object(TestingConfig())
    else:
        app.config.from_object(Config())

    if app.config["LOG_WITH_GUNICORN"]:
        gunicorn_error_logger = logging.getLogger('gunicorn.error')
        app.logger.handlers.extend(gunicorn_error_logger.handlers)
        app.logger.setLevel(logging.DEBUG)
    else:
        file_handler = RotatingFileHandler(
            'instance/flackt.log',
            maxBytes=16384,
            backupCount=20
        )
        file_formatter = logging.Formatter('%(asctime)s %(levelname)s %(threadName)s-%(thread)d: %(message)s [in %(filename)s:%(lineno)d]')
        file_handler.setFormatter(file_formatter)
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
    
    app.logger.removeHandler(default_handler)
    app.logger.info('Starting the Flackt App ...')

    @app.route("/")
    def index():
        return render_template("index.html")

    from .views.auth import auth

    app.register_blueprint(auth)

    from .views.channels import chan

    app.register_blueprint(chan)

    socket.init_app(app)

    return app
