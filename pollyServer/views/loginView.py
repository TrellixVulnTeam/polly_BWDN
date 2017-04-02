from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from ..serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class Login	(APIView):

	# Login user
	def post(self, request, *args, **kwargs):
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(username=username, password=password)
		if user is not None:
			if user.is_active:
				login(request, user)
				return Response(status=200)
			else:
				return Response(status=401)
		else:
			return Response(status=401)