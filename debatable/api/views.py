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

@api_view(['GET'])
def viewPost(request,id):
    post = Post.objects.get(url_id=id)
    serializer = PostSerializer(post)
    return Response(serializer.data)

class viewPosts(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer