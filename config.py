class Config(object):
    DEBUG=True
    TESTING=False 
    #@property
    # some function(self):
        #self.ENV_SETTING_CONFIG=value

class ProductionConfig(Config):
    DEBUG=False

class TestingConfig(Config):
    TESTING = True        


