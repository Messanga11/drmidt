from django.urls import path
from . import views

urlpatterns = [
    path('', views.loginPage, name='login'),
    path('logout/', views.logoutUser, name='logout'),
    path('accueil/', views.accueil, name='accueil'),
    path('enregistrement/', views.enregistrement, name='enregistrement'),
    path('liste_arrive/', views.liste_arrive, name='liste_arrive'),
    path('liste_depart/', views.liste_depart, name='liste_depart'),
    path('transmission/<int:id>', views.transmission, name='transmission'),
    path('recevoir/<int:id>', views.recevoir, name='recevoir'),
    path('courier_transmis/<slug:slug>', views.courier_transmis, name='courier_transmis'),
]
