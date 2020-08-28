from django.contrib.auth import get_user_model
from django.test import TestCase


class victorManagerTestCase(TestCase):
    def setUp(self):
        self.user_model = get_user_model()

    def test_create_user(self):
        email_lowercase = 'normal@normal.com'
        user = self.user_model.objects.create_user(email=email_lowercase)

        self.assertEqual(user.email, email_lowercase)
        self.assertFalse(user.has_usable_password())

    def test_create_user_empty_email(self):
        with self.assertRaisesMessage(ValueError, 'The given email must be set'):
            self.user_model.objects.create_user(username='')

    def test_create_user_is_staff(self):
        email = 'normal@normal.com'
        user = self.user_model.objects.create_user(email=email, is_staff=True)

        self.assertEqual(user.email, email)
        self.assertTrue(user.is_staff)

    def test_create_superuser(self):
        email = 'normal@normal.com'
        user = self.user_model.objects.create_superuser(email=email, password='test')

        self.assertEqual(user.email, email)
        self.assertTrue(user.is_staff)

    def test_create_superuser_raises_error_on_false_is_staff(self):
        with self.assertRaisesMessage(ValueError, 'Superuser must have is_staff=True.'):
            self.user_model.objects.create_superuser(
                email='test@test.com', password='test', is_staff=False,
            )
