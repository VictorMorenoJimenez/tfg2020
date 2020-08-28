from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED


class CreateOwnedModelMixin(CreateModelMixin):
    """
    Mixin used for models related through a foreign key to their owner
    """
    def create(self, request, *args, **kwargs):
        data = request.data
        data['owner'] = request.user.active_profile
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)
