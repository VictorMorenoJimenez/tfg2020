import re

from django.utils.translation import gettext as _
from rest_framework.exceptions import ValidationError


class UppercaseValidator:
    def validate(self, password, user=None):
        if any(char.isupper() for char in password):
            return True

        raise ValidationError(
            _("Your password must contain at least one uppercase character"),
            code='password_no_uppercase'
        )

    def get_help_text(self):
        return _("Your password must contain at least one uppercase character")


class LowercaseValidator:
    def validate(self, password, user=None):
        if any(char.islower() for char in password):
            return True

        raise ValidationError(
            _("Your password must contain at least one lowercase character"),
            code='password_no_lowercase'
        )

    def get_help_text(self):
        return _("Your password must contain at least one lowercase character")


class DigitValidator:
    def validate(self, password, user=None):
        if any(char.islower() for char in password):
            return True

        raise ValidationError(
            _("Your password must contain at least one number"),
            code='password_no_digit'
        )

    def get_help_text(self):
        return _("Your password must contain at least one number")


class SpecialCharValidator:
    def validate(self, password, user=None):
        if re.search(r"[^\w]", password) is not None:
            return True

        raise ValidationError(
            _("Your password must contain at least one special character"),
            code='password_no_special_char'
        )

    def get_help_text(self):
        return _("Your password must contain at least one special character")
