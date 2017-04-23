from ..models import Choice, Question
from ..serializers import ChoiceSerializer
from django.db.models import F
from rest_framework import mixins
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
import datetime

class VoteDetail(mixins.UpdateModelMixin,
				 generics.GenericAPIView):

    # authentication_classes = (SessionAuthentication, BasicAuthentication)
    # permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Choice.objects.get(pk=pk)
        except Snippet.DoesNotExist:
            return HttpResponse(status=404)

    def put(self, request, *args, **kwargs):
        
        try:
            questionId = kwargs["question_id"]
            choiceId = kwargs["choice_id"]
            oldChoiceId = kwargs["old_choice_id"]
            choice = Choice.objects.get(pk=choiceId, question=questionId)
            question = Question.objects.get(pk=questionId)
        except Choice.DoesNotExist:
            return HttpResponse(status=404)

        if question.end_date is None or question.end_date >= timezone.now():
            
            # Getting previous choice
            oldChoice = Choice.objects.get(question=questionId, users_voted__id=request.user.id)

            # Checking if old choice exists
            if oldChoice is not None:

                # Removing user from old choice
                oldChoice.users_voted.remove(request.user.id)
                oldChoice.save()

            # choice.votes = choice.users_voted.count()
            choice.users_voted.add(request.user.id)
            choice.save()
            
            return HttpResponse(status=200)
        
        return HttpResponse(status=404)