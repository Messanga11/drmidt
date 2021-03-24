from django.db import models


class Status_Choices(models.TextChoices):
    Inspecte = 'inspecte'
    Non_inspecte = 'non_inspecte'


SEMESTER_CHOICES = (
    ("1", "1"),
    ("2", "2"),
    ("3", "3"),
    ("4", "4"),
)


class ETS_Premiere_Classe(models.Model):
    Semestre = models.CharField(max_length=20, choices=SEMESTER_CHOICES, default='1')
    Semestre_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=Status_Choices.choices, default=Status_Choices.Non_inspecte)
    Denomination_ou_Raison_social = models.CharField(max_length=50, default=None)
    Type_Dinstallatiion = models.CharField(max_length=50, default=None)
    Localisation = models.CharField(max_length=50, default=None)
    Adresse = models.CharField(max_length=50, default=None)
    Inspecteurs = models.CharField(max_length=50, default=None)
    Administration = models.CharField(max_length=50, default=None)
