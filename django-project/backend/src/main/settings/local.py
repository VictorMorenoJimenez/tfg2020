from .base import *  # noqa

from .base import SWAGGER_SETTINGS
from decouple import config

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = True
# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = config(
    "DJANGO_SECRET_KEY",
    default="Ye6cecVf3LY2l3cdIPU5eTwabInrm1ZKy7iaNHy5sFUGI5VwuV1wrHi1nxy0p89N",
)
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = [
    "localhost",
    "0.0.0.0",
    "127.0.0.1"
]

# Testing config..
TEST_RUNNER = "django.test.runner.DiscoverRunner"

# Emailing config.
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


# CACHES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#caches
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "",
    }
}

# http://docs.celeryproject.org/en/latest/userguide/configuration.html#task-eager-propagates
CELERY_TASK_EAGER_PROPAGATES = True

if DEBUG is True:
    SWAGGER_SETTINGS.update({'PERSIST_AUTH': True})
