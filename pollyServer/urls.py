from django.conf.urls import url
from django.views.generic.base import TemplateView

from .views import choiceView, loginView, usersView, questionsView, voteView

urlpatterns = [
    url(r'^questions/$', questionsView.QuestionList.as_view()),
    url(r'^questions/(?P<pk>[0-9]+)/$', questionsView.QuestionDetail.as_view()),
    # url(r'^questions/(?P<question_id>[0-9]+)/results/$', views.results),          
    url(r'^questions/(?P<question_id>[0-9]+)/vote/(?P<choice_id>[0-9]+)/$', voteView.VoteDetail.as_view),      
    url(r'^users/$', usersView.UserList.as_view()),
    url(r'^users/login/$', loginView.Login.as_view()),
]