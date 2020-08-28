"""
Base settings to build other settings files upon.
"""

import os
from decouple import config
from pathlib import Path
# from dj_database_url import parse as db_url

ROOT_DIR = Path(__file__).parent
APPS_DIR = ROOT_DIR.parent

ENV_API_BASE_URL = "services/django_template/"

# env = environ.Env()
#
# READ_DOT_ENV_FILE = env.bool('DJANGO_READ_DOT_ENV_FILE', default=False)
# if READ_DOT_ENV_FILE:
#     # OS environment variables take precedence over variables from .env
#     env.read_env(str(ROOT_DIR.path('.env')))

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = config("DJANGO_DEBUG", default=False, cast=bool)
# Local time zone. Choices are
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# though not all of them may be available with every OS.
# In Windows, this must be set to your system time zone.
TIME_ZONE = "Europe/Madrid"
# https://docs.djangoproject.com/en/dev/ref/settings/#language-code
LANGUAGE_CODE = "en-us"
# https://docs.djangoproject.com/en/dev/ref/settings/#site-id
SITE_ID = 1
# https://docs.djangoproject.com/en/dev/ref/settings/#use-i18n
USE_I18N = False
# https://docs.djangoproject.com/en/dev/ref/settings/#use-l10n
USE_L10N = True
# https://docs.djangoproject.com/en/dev/ref/settings/#use-tz
USE_TZ = True

# DATABASES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#databases
# DATABASES = {"default": config("DATABASE_URL", cast=db_url)}
# DATABASES["default"]["ATOMIC_REQUESTS"] = True

DATABASES = {
    'default': {
        'ENGINE': "django.db.backends.mysql",
        'NAME': config('MYSQL_DATABASE'),
        'USER': config('MYSQL_USER'),
        'PASSWORD': config('MYSQL_PASSWORD'),
        'HOST': config('MYSQL_HOST'),
        'PORT':  config('MYSQL_PORT'),
    },
}


# URLS
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#root-urlconf
ROOT_URLCONF = "main.urls"
# https://docs.djangoproject.com/en/dev/ref/settings/#wsgi-application
WSGI_APPLICATION = "main.wsgi.application"

# APPS
# ------------------------------------------------------------------------------
DJANGO_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sites",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.admin",
    "django.contrib.sessions"
]


THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework.authtoken",
    "drf_yasg",

    "allauth",
    "allauth.account",
    "rest_auth",
    "rest_auth.registration",
    
    "djcelery_email",
    
]

LOCAL_APPS = [
    # Place your apps, here.
]

# https://docs.djangoproject.com/en/dev/ref/settings/#installed-apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS


# PASSWORDS
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#password-hashers
PASSWORD_HASHERS = [
    # https://docs.djangoproject.com/en/dev/topics/auth/passwords/#using-argon2-with-django
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
    "django.contrib.auth.hashers.BCryptPasswordHasher",
]

# https://docs.djangoproject.com/en/dev/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            'min_length': 8
        }
    },
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
]


# MIDDLEWARE
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#middleware
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'drf_yasg.middleware.SwaggerExceptionMiddleware',
    "django.contrib.messages.middleware.MessageMiddleware",
]


# STATIC
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#static-root
STATIC_ROOT = str(ROOT_DIR.joinpath("staticfiles"))
# https://docs.djangoproject.com/en/dev/ref/settings/#static-url
STATIC_URL = "/static/"

# https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#staticfiles-finders
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

# MEDIA
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#media-root
MEDIA_ROOT = str(APPS_DIR.joinpath("media"))
# https://docs.djangoproject.com/en/dev/ref/settings/#media-url
MEDIA_URL = "/media/"

# STORAGES
# ------------------------------------------------------------------------------
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
EMAIL_BACKEND = config(
    "DJANGO_EMAIL_BACKEND", default="django.core.mail.backends.smtp.EmailBackend"
)

EMAIL_BACKEND = config(
    "DJANGO_EMAIL_BACKEND", default="djcelery_email.backends.CeleryEmailBackend"
)


# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#default-from-email
DEFAULT_FROM_EMAIL = config("DJANGO_DEFAULT_FROM_EMAIL")
# https://docs.djangoproject.com/en/dev/ref/settings/#server-email
SERVER_EMAIL = config("DJANGO_SERVER_EMAIL", default=DEFAULT_FROM_EMAIL)
# https://docs.djangoproject.com/en/dev/ref/settings/#email-subject-prefix
EMAIL_SUBJECT_PREFIX = config("DJANGO_EMAIL_SUBJECT_PREFIX", default="[Web Project]")
# https://docs.djangoproject.com/en/dev/ref/settings/#email-host
EMAIL_HOST = config("DJANGO_EMAIL_HOST")
# https://docs.djangoproject.com/en/dev/ref/settings/#email-port
EMAIL_PORT = config("DJANGO_EMAIL_PORT", cast=int, default=25)
# https://docs.djangoproject.com/en/dev/ref/settings/#email-username
EMAIL_HOST_USER = config("DJANGO_EMAIL_HOST_USER")
# https://docs.djangoproject.com/en/dev/ref/settings/#email-password
EMAIL_HOST_PASSWORD = config("DJANGO_EMAIL_HOST_PASSWORD")
# https://docs.djangoproject.com/en/dev/ref/settings/#email-use-tls
EMAIL_USE_TLS = config("DJANGO_EMAIL_USE_TLS", cast=bool, default=False)

SMTP_CONFIG = {
    "default": {
        "host": EMAIL_HOST,
        "port": EMAIL_PORT,
        "username": EMAIL_HOST_USER,
        "password": EMAIL_HOST_PASSWORD,
        "use_tls": EMAIL_USE_TLS
    }
}

# https://docs.djangoproject.com/en/dev/ref/settings/#admins
ADMINS = [("victormoreno@protonmail.com", )]
# https://docs.djangoproject.com/en/dev/ref/settings/#managers
MANAGERS = ADMINS

DATE_INPUT_FORMATS = ['%Y-%m-%d', 'iso-8601']
DATETIME_INPUT_FORMATS = ['%Y-%m-%dT%H:%M:%S.%fZ', 'iso-8601']


# TEMPLATES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#templates
TEMPLATES = [
    {
        # https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-TEMPLATES-BACKEND
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        # https://docs.djangoproject.com/en/dev/ref/settings/#template-dirs
        "DIRS": [str(APPS_DIR.joinpath("templates"))],
        "OPTIONS": {
            # https://docs.djangoproject.com/en/dev/ref/settings/#template-debug
            "debug": DEBUG,
            # https://docs.djangoproject.com/en/dev/ref/settings/#template-loaders
            # https://docs.djangoproject.com/en/dev/ref/templates/api/#loader-types
            "loaders": [
                "django.template.loaders.filesystem.Loader",
                "django.template.loaders.app_directories.Loader",
            ],
            # https://docs.djangoproject.com/en/dev/ref/settings/#template-context-processors
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    }
]

# Config rest framework
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES":
        [
            'rest_framework.authentication.TokenAuthentication'
        ],
    "DEFAULT_PERMISSION_CLASSES":
        [
            'rest_framework.permissions.IsAuthenticated'
        ],
    "DEFAULT_VERSIONING_CLASS": "rest_framework.versioning.NamespaceVersioning",
    "DEFAULT_FILTER_BACKENDS":
        [
            "rest_framework.filters.SearchFilter",
            "django_filters.rest_framework.DjangoFilterBackend",
        ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "TEST_REQUEST_DEFAULT_FORMAT": "json",
    "PAGE_SIZE": 10,
    "DATE_INPUT_FORMATS": ['%Y-%m-%dT%H:%M:%S.%fZ', 'iso-8601'],
    "DATETIME_INPUT_FORMATS": ['%Y-%m-%d', 'iso-8601'],
    "UPLOADED_FILES_USE_URL": True,
}

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'DRF Token': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header'
        }
    }
}

# Translations
gettext = lambda s: s  # noqa: E731
LANGUAGES = (
    ("en", gettext("English")),
    ("es", gettext("Spanish")),
    ("fr", gettext("French")),
)

# Folder to store translations
LOCALE_PATHS = (os.path.join(APPS_DIR, "locale"),)

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
        "file": {"class": "logging.FileHandler", "filename": "filename.log"},
    },
    "loggers": {},
}





# Celery
# ------------------------------------------------------------------------------
if USE_TZ:
    # http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-timezone
    CELERY_TIMEZONE = TIME_ZONE
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-broker_url
CELERY_BROKER_URL = config("CELERY_BROKER_URL")
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-result_backend
CELERY_RESULT_BACKEND = CELERY_BROKER_URL
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-accept_content
CELERY_ACCEPT_CONTENT = ["json"]
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-task_serializer
CELERY_TASK_SERIALIZER = "json"
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#std:setting-result_serializer
CELERY_RESULT_SERIALIZER = "json"
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#task-time-limit
# TODO: set to whatever value is adequate in your circumstances
CELERY_TASK_TIME_LIMIT = 5 * 60
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#task-soft-time-limit
# TODO: set to whatever value is adequate in your circumstances
CELERY_TASK_SOFT_TIME_LIMIT = 60
# http://docs.celeryproject.org/en/latest/userguide/configuration.html#beat-scheduler
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"


