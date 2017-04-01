import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import F
from django.contrib.auth.models import User
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework import permissions
from .models import Question, Choice
from .serializers import ChoiceSerializer, QuestionSerializer, UserSerializer

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

@csrf_exempt
def questions_list(request):

    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = QuestionSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def question_detail(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = QuestionSerializer(question)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = QuestionSerializer(question, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        question.delete()
        return HttpResponse(status=204)

@csrf_exempt
def vote_choice(request, question_id, choice_id):
    try:
        choice = Choice.objects.get(pk=choice_id, question=question_id)
    except Choice.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'POST':
        choice.votes = F('votes') + 1
        choice.save()
        return HttpResponse(status=200)

    elif request.method == 'GET':
        serializer = ChoiceSerializer(choice)
        return JsonResponse(serializer.data)

    if request.method == 'DELETE':
        if choice.votes > 0:
            choice.votes = F('votes') - 1
            choice.save()
            return HttpResponse(status=200)

def users_list(request):
    try:
        users = User.objects.all();
    except User.DoesNotExists:
        return HttpResponse(status=404)

    if (request.method == 'POST'):
        reqBody = json.loads(request.body.decode('utf-8'))
        serializer = UserSerializer(data=reqBody)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def user_details(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)             

# TODO: Add many to many relation between user and vote_choice
# TODO: User needs to be connected for this method
