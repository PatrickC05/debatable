from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, permissions
from .models import Post, Vote
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
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def get(self, request, id):
        post = Post.objects.get(url_id=id)
        return Response({"Agree": post.votes.filter(agree=True).count(), "Disagree": post.votes.filter(agree=False).count()})

    def put(self, request, id):
        # 1 agree, 0 disagree, -1 disagree
        post = Post.objects.get(url_id=id)
        user = request.user
        vote = int(request.data['vote'])
        print(vote==1)
        if vote == 0:
            Vote.objects.filter(post=post.id).get(voter=user.id).delete()
        elif abs(vote) <= 1:
            try:
                vote_obj = Vote.objects.filter(post=post.id).get(voter=user.id)
                serializer = self.get_serializer(vote_obj, data={'agree': vote==1}, partial=True)
            except Exception as e:
                print(e)
                serializer = self.get_serializer(data={'post': post.id, 'voter': user.id, 'agree': vote==1})
            serializer.is_valid(raise_exception=True)
            vote = serializer.save()
        
        return self.get(request, id)
