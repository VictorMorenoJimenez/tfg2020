import base64

from django.core.files.base import ContentFile
from django.utils.translation import gettext as _
from django.utils import six
from rest_framework.fields import Field
from rest_framework.settings import api_settings


class Base64FileField(Field):
    default_error_messages = {
        'required': _('No file was submitted.'),
        'invalid': _('The submitted data was not a file. Check the encoding type on the form.'),
        'no_name': _('No filename could be determined.'),
        'empty': _('The submitted file is empty.'),
        'max_length': _('Ensure this filename has at most {max_length} characters (it has {length}).'),
    }

    def __init__(self, header='', *args, **kwargs):
        self.max_length = kwargs.pop('max_length', None)
        self.allow_empty_file = kwargs.pop('allow_empty_file', False)
        if 'use_url' in kwargs:
            self.use_url = kwargs.pop('use_url')
        self.header = header
        super().__init__(*args, **kwargs)

    def to_internal_value(self, data):
        if isinstance(data, six.string_types) and data.startswith(self.header):
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]
            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
        try:
            # `UploadedFile` objects should have name and size attributes.
            file_name = data.name
            file_size = data.size
        except AttributeError:
            self.fail('invalid')

        if not file_name:
            self.fail('no_name')
        if not self.allow_empty_file and not file_size:
            self.fail('empty')
        if self.max_length and len(file_name) > self.max_length:
            self.fail('max_length', max_length=self.max_length, length=len(file_name))

        return data

    def to_representation(self, value):
        if not value:
            return None

        use_url = getattr(self, 'use_url', api_settings.UPLOADED_FILES_USE_URL)

        if use_url:
            if not getattr(value, 'url', None):
                # If the file has not been saved it may not have a URL.
                return None
            url = value.url
            request = self.context.get('request', None)
            if request is not None:
                return request.build_absolute_uri(url)
            return url

        return value.name
