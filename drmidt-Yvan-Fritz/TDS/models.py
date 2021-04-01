from django.db import models
from django.utils import timezone
import datetime
from django.core.validators import MaxValueValidator, MinValueValidator
from djmoney.models.fields import MoneyField


# Create your models here. 'name == department'
class Department(models.TextChoices):
    Wouri = 'wouri'
    NKam = 'nkam'
    Sanaga_Maritime = 'sanaga-maritime'
    Moungo = 'moungo'


class Class_categories(models.TextChoices):
    Premiere_1 = '1st'
    Seconde_2 = '2nd'


SEMESTER_CHOICES = (
    ("1", "1"),
    ("2", "2"),
    ("3", "3"),
    ("4", "4"),
)


def current_year():
    return datetime.date.today().year


def max_value_current_year(value):
    return MaxValueValidator(current_year())(value)


class Tableau_de_synthese(models.Model):
    department = models.CharField(max_length=50, choices=Department.choices, default=None)
    class_type = models.CharField(max_length=50, choices=Class_categories.choices, )
    Semestre = models.CharField(max_length=20, choices=SEMESTER_CHOICES, default='1')
    year = models.PositiveIntegerField(
        default=current_year(), validators=[MinValueValidator(1998), max_value_current_year])
    nombre_de_ec_en_activite = models.IntegerField(blank=True, null=True, )
    nombre_de_ec_nouveaux = models.IntegerField(blank=True, null=True, )
    nombre_de_ec_fermes = models.IntegerField(blank=True, null=True, )
    taux_de_augmentation_or_regression = models.FloatField(blank=True, null=True, )
    nombre_de_ec_programmes = models.IntegerField(blank=True, null=True, )
    nombre_de_ec_inspectes = models.IntegerField(blank=True, null=True, )
    taux_de_couverture = models.FloatField(blank=True, null=True, )
    nombre_de_ec_autorise_or_declares = models.IntegerField(blank=True, null=True, )
    taux_de_conformite = models.FloatField(blank=True, null=True, )
    montant_des_ESD_generes_or_superficiaires = MoneyField(max_digits=14, decimal_places=2, default_currency='XAF',
                                                           blank=True, null=True, )
    montant_des_ESD_generes_au_titre_des_FVAPG_et_FVAPVE = MoneyField(max_digits=14, decimal_places=2,
                                                                      default_currency='XAF', blank=True, null=True, )
    recouvres = MoneyField(max_digits=14, decimal_places=2, default_currency='XAF', blank=True, null=True, )

    total = models.IntegerField()
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}".format(self.department)
