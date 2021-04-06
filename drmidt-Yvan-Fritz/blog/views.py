from django.shortcuts import render, get_object_or_404
from .models import Post
from django.views.generic import ListView


def post_list(request):
    cat = request.GET.get("cat")
    if cat != None:
        posts = Post.published.filter(category=cat)
        return render(request, 'blog/post/list.html', {'posts': posts, "title": cat})
    posts = Post.published.filter(category="blog_Post")
    return render(request,
                  'blog/post/list.html',
                  {'posts': posts, "title": "Articles de Blog"})

def post_list_potentatialites(request):
    posts = Post.published.exclude(category="blog_Post").exclude(category="annouce").exclude(category="magazine").exclude(category="actualite").exclude(category="inspections")
    return render(request,
                  'blog/post/list.html',
                  {'posts': posts, "title": "Potentialités"})

def post_detail(request, year, month, day, post):
    posts = Post.published.all()
    post = get_object_or_404(Post, slug=post,
                             status='published',
                             publish__year=year,
                             publish__month=month,
                             publish__day=day)
    return render(request,
                  'blog/post/detail.html',
                  {'post': post, 'posts': posts})

