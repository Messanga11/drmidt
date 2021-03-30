from rest_framework import viewsets
from django.shortcuts import render
from .models import Local_stat
from .serializers import Local_statSerializer


class Dept_chartView(viewsets.ModelViewSet):
    queryset = Local_stat.objects.all().order_by('department')
    serializer_class = Local_statSerializer
    http_method_names = ['get']

def index(request):
    context = {"currentPage": 2}
    return render(request, "stats/stats.html", context)

def cadre_juridique(request):
    context = {"currentPage": 3}
    return render(request, "stats/cadreJuridique.html", context)