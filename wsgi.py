from flackt import create_app

app = create_app(instance_in={"prod": True, "test": False, "dev": False})