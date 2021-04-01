from django.urls import path, re_path
from . import views

app_name = 'blog'

urlpatterns = [
    # post views
    # path('', views.post_list, name='post_list'),
    path('', views.post_list, name='post_list'),
    path('potentialites/', views.post_list_potentatialites, name='post_list'),
    re_path(r'^(\?cat=[a-zA-Z]+)', views.post_list, name='post_list'),
    path('<int:year>/<int:month>/<int:day>/<slug:post>/',
         views.post_detail,
         name='post_detail'),
]
