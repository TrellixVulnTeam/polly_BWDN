from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Question(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='questions_set')
    question_text = models.CharField(max_length=200)
    participants = models.ManyToManyField('auth.User')
    pub_date = models.DateTimeField('date published')
    end_date = models.DateTimeField('end date')
    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choice_set')
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    users_voted = models.ManyToManyField('auth.User')
    def __str__(self):
        return self.choice_text 