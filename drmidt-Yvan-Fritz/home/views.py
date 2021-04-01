from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from blog.models import Post

# Create your views here.
def index(request):
    posts = Post.published.all()
    context = {
        'posts': posts,
        'post_actu': {},
        'post_magzi': {},
        'post_anor': {},
        }
    context["blog_posts"] = Post.published.filter(category="blog_Post")
    context["potentialites_posts"] = Post.published.exclude(category="blog_Post").exclude(category="annouce").exclude(category="magazine").exclude(category="actualite")
    for post in posts:
        if post.category == "actualite":
            context["post_actu"] = post
            break
    for post in posts:
        if post.category == "magazine":
            context["post_magzi"] = post
            break
    for post in posts:
        if post.category == "annouce":
            context["post_anor"] = post
            break
    print(context)
    return render(request, 'home/home.html', context)