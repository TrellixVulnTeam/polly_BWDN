from ..models import Choice
from ..serializers import ChoiceSerializer
from django.db.models import F
from rest_framework import mixins
from rest_framework import generics
from django.http import HttpResponse, JsonResponse

class VoteDetail(mixins.UpdateModelMixin,
				generics.GenericAPIView):

	def get_object(self, pk):
		try:
			return Choice.objects.get(pk=pk)
		except Snippet.DoesNotExist:
			return HttpResponse(status=404)

	def put(self, request, *args, **kwargs):
		try:
			choice = Choice.objects.get(pk=pk, question=args[0])
		except Choice.DoesNotExist:
			return HttpResponse(status=404)

		choice.votes = F('votes') + 1
		choice.save()
		return HttpResponse(status=200)