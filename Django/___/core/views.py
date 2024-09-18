from .models import CoreUser
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import CoreUserSerializer


class CoreUserEndpoint(APIView):
    def get(self, request):
        users = CoreUser.objects.all()
        response = [{
            'user_id': user.user_id,
            'email': user.email,
            'username': user.username,
            'date_joined': user.date_joined
        } for user in users]
        return Response(response)

    def post(self, request):
        serializer = CoreUserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class TestEndpoint(APIView):
    def get(self, request):
        return Response({
            'Annonymous': request.user.is_anonymous
        })
