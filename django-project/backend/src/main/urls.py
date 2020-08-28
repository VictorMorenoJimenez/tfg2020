from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.urls import include, path
from django.views import defaults as default_views

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from django.contrib import admin


from rest_auth.registration.views import RegisterView
from rest_framework.routers import DefaultRouter


# drf-yasg
schema_view = get_schema_view(
    info=openapi.Info(
        title="Django template",
        default_version="0.1.0",
        description="Awesome Django template project",
        terms_of_service="intelligenia.com",
        contact=openapi.Contact(
            name="Victor",
            email="victormoreno@protonmail.com"
        ),
    ),
    validators=["flex", "ssv"],
    public=True,
    permission_classes=(permissions.AllowAny,),
)


router = DefaultRouter()


urlpatterns = [
    path('', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/auth/', include('rest_auth.urls')),
    url(r'^api/auth/signup/$', RegisterView.as_view(), name='rest_register'),
    url(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    url(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    url(
        r"^redoc/$",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
