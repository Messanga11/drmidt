from django.urls import path
from . import views

urlpatterns = [
    path("", views.cadre_juridique, name="cadrej"),
    path("legistatifs/", views.legislatifs, name="cadrej_leg"),
    path("reglementaires/", views.reglementaires, name="cadrej_reg"),
    path("nominations/", views.nominations, name="cadrej_nom"),
]
