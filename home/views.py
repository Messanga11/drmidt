from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from blog.models import Post

# Create your views here.
def index(request):
    posts = Post.published.all()
    context = {"currentPage": 0, 'posts': posts}
    return render(request, 'home/home.html', context)