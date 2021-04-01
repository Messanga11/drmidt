from djmoney.models.fields import MoneyField
from django.db import models
from django.utils import timezone


# Create your models here. 'name == department'
class Department(models.TextChoices):
    Wouri = 'wouri'
    NKam = 'nkam'
    Sanaga_Maritime = 'sanaga-maritime'
    Moungo = 'moungo'


class Local_stat(models.Model):
    department = models.CharField(max_length=50, choices=Department.choices, default=Department.Wouri)
    money = MoneyField(max_digits=14, decimal_places=2, default_currency='XAF')
    recovered = MoneyField(max_digits=14, decimal_places=2, default_currency='XAF', default=0)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}-{}".format(self.money, self.department)
