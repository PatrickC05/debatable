from django.db import models
from django.contrib.auth.models import User
import string
import random

def generateUrlId():
    choices = string.ascii_lowercase + string.ascii_lowercase + string.digits + '-_'
    while True:
        res = ''.join(random.choices(choices, k=12))
        if Post.objects.filter(url_id=res).count() == 0:
            return res

class Post(models.Model):
    url_id = models.CharField(max_length=12, default=generateUrlId)
    poster = models.ForeignKey(User,on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=60, default='')
    body = models.CharField(max_length=10000, default='')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

