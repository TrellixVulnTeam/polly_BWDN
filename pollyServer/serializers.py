from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Choice, Question

class ChoiceSerializer(serializers.ModelSerializer):

    users_voted = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Choice
        fields = ('id','question','choice_text', 'votes', 'users_voted')

class QuestionSerializer(serializers.ModelSerializer):

    choice_set = ChoiceSerializer(many=True, read_only=True)
    user_name = serializers.ReadOnlyField(source='user.username')
    participants = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ('id', 
                  'question_text', 
                  'pub_date', 
                  'end_date', 
                  'choice_set', 
                  'user', 
                  'user_name', 
                  'participants',
                  'is_transparent')

class UserSerializer(serializers.ModelSerializer):

    # questions_set = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        write_only_fields = ['password']
        read_only_fields = ['id']

	# Overriding create and update to handle passwords coorrectly.
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

		# Setting password this way will store it encrypted, 
		# and this is the right way for authentication to work properly
        user.set_password(validated_data['password'])
        user.save()

        return user
	
    def update(self, instance, validated_data):

		# Setting password, same issue as on create
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super(UserSerializer, self).update(instance, validated_data)