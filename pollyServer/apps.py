from django.apps import AppConfig


class PollyserverConfig(AppConfig):
    name = 'pollyServer'

    def ready(self):
        from . import signals