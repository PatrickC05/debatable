from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer, VoteSerializer


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

class createPost(generics.GenericAPIView):
    serializer_class = PostSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request):
        data = request.data.copy()
        data['poster'] = request.user.pk
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        post = serializer.save()
        return Response({"id":post.url_id})

class getVote(generics.GenericAPIView):
    serializer_class = VoteSerializer
    def get(self, request, id):
        post = Post.objects.get(url_id=id)
        print(post)
        return Response({"Agree": post.votes.filter(agree=True).count(), "Disagree": post.votes.filter(agree=False).count()})