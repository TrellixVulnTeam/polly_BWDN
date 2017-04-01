from django.conf.urls import url
from django.views.generic.base import TemplateView

from . import views

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^questions/$', views.questions_list),
    url(r'^questions/(?P<pk>[0-9]+)/$', views.question_detail),
    # url(r'^questions/(?P<question_id>[0-9]+)/results/$', views.results),          
    url(r'^questions/(?P<question_id>[0-9]+)/vote/(?P<choice_id>[0-9]+)/$', views.vote_choice),      
    url(r'^users/$', views.users_list),    
]