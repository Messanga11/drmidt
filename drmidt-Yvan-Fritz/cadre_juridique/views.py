from django.shortcuts import render
from .models import Pdf

# Create your views here.

def cadre_juridique(request):
    pdfs = Pdf.objects.all()
    context = {
        "pdfs": pdfs
    }
    return render(request, "cadrej/cadreJuridique.html", context)


def legislatifs(request):
    pdfs = Pdf.objects.filter(category="legislatifs")
    context = {
        "pdfs": pdfs
    }
    return render(request, "cadrej/cadreJuridique.html", context)


def reglementaires(request):
    pdfs = Pdf.objects.filter(category="reglementaires")
    context = {
        "pdfs": pdfs
    }
    return render(request, "cadrej/cadreJuridique.html", context)


def nominations(request):
    pdfs = Pdf.objects.filter(category="nominations")
    context = {
        "pdfs": pdfs
    }
    return render(request, "cadrej/cadreJuridique.html", context)