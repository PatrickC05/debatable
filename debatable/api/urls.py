from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='overview'),
    path('posts', views.viewPosts.as_view(), name='posts'),
    path('post/<str:id>', views.viewPost.as_view(), name="post")
]