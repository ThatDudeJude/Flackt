from environs import Env

env = Env()
env.read_env()


class Config(object):
    DEBUG = True
    TESTING = False
    SECRET_KEY = env.str("SECRET_KEY")


class ProductionConfig(Config):
    DEBUG = False


class TestingConfig(Config):
    TESTING = True
