from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Choice, Question

class ChoiceSerializer(serializers.ModelSerializer):

	class Meta:
		model = Choice
		fields = ('question','choice_text', 'votes')

class QuestionSerializer(serializers.ModelSerializer):

	choice_set = ChoiceSerializer(many=True, read_only=True)
	user_name = serializers.ReadOnlyField(source='user.username')

	class Meta:
		model = Question
		fields = ('question_text', 'pub_date', 'end_date', 'choice_set', 'user', 'user_name')

class UserSerializer(serializers.ModelSerializer):

    questions_set = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'questions_set')
