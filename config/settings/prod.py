from .base import *
import dj_database_url

DATABASES['default'] = dj_database_url.config()

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

DEBUG = False

ADMINS = (
  ('Delita Makanda', 'delita.makanda@gmail.com'),
)

ALLOWED_HOSTS = ['.herokuapp.com']

STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
