from django.contrib.auth.models import User
from ..serializers import UserSerializer
from rest_framework import mixins
from rest_framework import generics
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import viewsets
from django.http import JsonResponse

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def retrieve(self, request, pk=None):
    #     if pk == 'i':
    #         return JsonResponse(UserSerializer(request.user,
    #             context={'request':request}).data)
    #     return super(UserViewSet, self).retrieve(request, pk)

class UserList(mixins.CreateModelMixin,
               generics.GenericAPIView):
	
    # authentication_classes = (SessionAuthentication, BasicAuthentication)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class UserDetail(mixins.RetrieveModelMixin,
                 mixins.UpdateModelMixin,
                 mixins.DestroyModelMixin,
                 generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)