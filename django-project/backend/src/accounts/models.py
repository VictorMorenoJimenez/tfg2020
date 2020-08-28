from django.contrib.auth.models import AbstractBaseUser
from django.utils import timezone
from django.db import models
from django.utils.translation import gettext_lazy as _

from accounts.addons.managers import victorManager


class victor(AbstractBaseUser):
    email = models.EmailField(
        _('email address'),
        unique=True,
        error_messages={
            'unique': _('A user with that email already exists.'),
        },
    )
    first_name = models.CharField(
        _('first name'), max_length=30, blank=True
    )
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(
        _('date joined'), default=timezone.now
    )
    created = models.DateTimeField(
        auto_now_add=True
    )

    objects = victorManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'

    def __str__(self):
        return '{0}'.format(self.email)

    def clean(self):
        # Reference: https://kite.com/python/docs/django.db.models.Model.clean
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the custom word, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, 'Custom')
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff
