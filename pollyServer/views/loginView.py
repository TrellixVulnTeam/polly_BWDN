from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from ..serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.backends import ModelBackend
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

class Login	(APIView):

	# authentication_classes = (SessionAuthentication, BasicAuthentication)

	# Login user
	def post(self, request, *args, **kwargs):
		username = request.data['username']
		password = request.data['password']
		user = authenticate(username=username, password=password)
		if user is not None:
			if user.is_active:
				login(request, user)
				return Response(UserSerializer(user).data)
			else:
				return Response(status=401)
		else:
			return Response(status=401)

class Logout(APIView):

	# Logout
	# @login_required(login_url='/users/login//')	
	def post(self, request, *args, **kwargs):
		logout(request)
		return Response(status=200)