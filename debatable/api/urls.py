from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='overview'),
    path('post/<str:id>', views.viewPost, name="post")
]