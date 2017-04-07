from ..models import Question
from ..serializers import QuestionSerializer
from rest_framework import mixins
from rest_framework import generics

class QuestionList(mixins.ListModelMixin,
                  	mixins.CreateModelMixin,
                  	generics.GenericAPIView):
	
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    # Overriden functions
    def get_queryset(self):

        # Gettting curretn user
        user = self.request.user

        # Returning only the questions relevant for current user 
        # Only questions the user is participating
        return Question.objects.filter(participants__id=user.id)

class QuestionDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)