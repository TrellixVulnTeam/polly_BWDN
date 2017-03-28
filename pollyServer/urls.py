from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^questions/$', views.questions_list),
    url(r'^questions/(?P<pk>[0-9]+)/$', views.question_detail),
    # url(r'^questions/(?P<question_id>[0-9]+)/results/$', views.results),          
    url(r'^questions/(?P<question_id>[0-9]+)/vote/(?P<choice_id>[0-9]+)/$', views.vote_choice),      
          
]