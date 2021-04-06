from django.contrib import admin
from .models import Pdf


@admin.register(Pdf)
class PdfAdmin(admin.ModelAdmin):
    list_display = ('category', 'pdf',)