from django.db import models

# Create your models here.

class Categories(models.TextChoices):
    legislatifs = 'legislatifs'
    reglementaires = 'reglementaires'
    nominations = 'nominations'

class Pdf(models.Model):
    title = models.CharField(max_length=200, default="")
    category = models.CharField(max_length=50, choices=Categories.choices, default=Categories.legislatifs)
    pdf = models.FileField(upload_to='pdf', blank=False)