from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from django.core.mail import send_mail
from blog.models import Post
from .forms import *

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
    context["potentialites_posts"] = Post.published.exclude(category="blog_Post").exclude(category="annouce").exclude(category="magazine").exclude(category="actualite").exclude(category="inspections")
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
    for post in posts:
        if post.category == "mines":
            context["post_rec_mine"] = post
            break
    for post in posts:
        if post.category == "industries":
            context["post_rec_industrie"] = post
            break
    for post in posts:
        if post.category == "développement_Technologique":
            context["post_rec_devTech"] = post
            break
    if request.method == "POST":
        form = contactForm(request.POST)
        if form.is_valid():
            from_email = form.cleaned_data["from_email"]
            subject = form.cleaned_data["subject"]
            message = form.cleaned_data["message"]
            send_mail(subject, message,from_email, ["minmidtlittoralcm@gmail.com"])
            #return redirect('post_list', form)
            return render(request, 'home/home.html', {'sent': 1,'form': form})
    form = contactForm()
    context['form'] = form
    return render(request, 'home/home.html', context)

def comite(request):
    return render(request, "home/comite.html")

def services(request):
    return render(request, "home/services.html")

def actualite(request):
    posts = Post.published.filter(category="inspections")
    context = {
        'posts': posts
        }
    return render(request, "blog/post/list.html", context)

def projets(request):
    posts = Post.published.filter(category="projet")
    context = {
        'posts': posts
        }
    return render(request, "blog/post/list.html", context)

def search(request):
    if request.method == 'POST':
        search = request.POST.get('search')
        posts = Post.published.filter(body__contains=search).order_by('-created')
        return render(request, 'search.html', {'posts': posts})