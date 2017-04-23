from django.conf.urls import url, include
from django.views.generic.base import TemplateView
from .views import choiceView, loginView, usersView, questionsView, voteView
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', usersView.UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^obtain-auth-token/$', obtain_auth_token),
    url(r'^questions/$', questionsView.QuestionList.as_view()),
    url(r'^questions/(?P<pk>[0-9]+)/$', questionsView.QuestionDetail.as_view()),
    # url(r'^questions/(?P<question_id>[0-9]+)/results/$', views.results),          
    # url(r'^questions/(?P<question_id>[0-9]+)/vote/(?P<choice_id>[0-9]+)/$', voteView.VoteDetail.as_view()),
    url(r'^questions/(?P<question_id>[0-9]+)/vote/(?P<choice_id>[0-9]+)/(from/(?P<old_choice_id>[0-9]+)/)?$', voteView.VoteDetail.as_view()),      
    # url(r'^users/$', usersView.UserList.as_view()),
    url(r'^login/$', loginView.Login.as_view()),
    url(r'^logout/$', loginView.Logout.as_view()),    
]

# TODO: Nested router