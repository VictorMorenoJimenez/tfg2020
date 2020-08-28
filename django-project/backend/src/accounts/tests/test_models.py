from django.contrib.auth import get_user_model
from django.test import TestCase


class victorTestCase(TestCase):
    def setUp(self):
        self.user_model = get_user_model()

    def test_normalize_email(self):
        email = 'normal@TonormalizE.com'
        user = self.user_model.objects.create_user(email=email)

        self.assertEqual(user.email, 'normal@tonormalize.com')

    def test_get_full_name(self):
        email_lowercase = 'normal@normal.com'
        user = self.user_model.objects.create_user(email=email_lowercase, first_name='albert')

        self.assertEqual(user.get_full_name(), 'albert Custom')

    def test_get_short_name(self):
        email_lowercase = 'normal@normal.com'
        user = self.user_model.objects.create_user(email=email_lowercase, first_name='albert')

        self.assertEqual(user.get_short_name(), 'albert')

    def test_has_perm(self):
        email = 'normal@normal.com'
        user = self.user_model.objects.create_superuser(email=email, password='test')

        self.assertEqual(user.is_staff, user.has_perm('user'))

    def test_has_module_perms(self):
        email = 'normal@normal.com'
        user = self.user_model.objects.create_superuser(email=email, password='test')

        self.assertEqual(user.is_staff, user.has_module_perms('accounts'))
