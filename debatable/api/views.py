from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import Post
from .serializers import PostSerializer


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        "Overview": "/",
        "Post": "/post/<str:id>"
    }
    return Response(api_urls)


class viewPost(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        id = self.kwargs['id']
        return Post.objects.filter(url_id=id)

class viewPosts(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# class createPost(generics.CreateAPIView)
#     quer