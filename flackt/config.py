from environs import Env

env = Env()
env.read_env()


class Config(object):
    DEBUG = True
    TESTING = False
    SECRET_KEY = env.str("SECRET_KEY")
    LOG_WITH_GUNICORN = False


class ProductionConfig(Config):
    DEBUG = False
    LOG_WITH_GURNICORN = True


class TestingConfig(Config):
    TESTING = True
