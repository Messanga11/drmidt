from django.contrib import admin
from .models import ETS_Premiere_Classe


# Register your models here.

# admin.site.register(Local_stats)

@admin.register(ETS_Premiere_Classe)
class ETS_Premiere_ClasseAdmin(admin.ModelAdmin):
    list_display = ('Denomination_ou_Raison_social', 'Type_Dinstallatiion', 'Localisation', 'Adresse',
                    'Semestre', 'Semestre_date', 'Inspecteurs', 'Administration', 'status',)
    list_filter = ('Denomination_ou_Raison_social', 'Type_Dinstallatiion', 'Localisation', 'Adresse',
                   'Inspecteurs', 'Administration',)
    date_hierarchy = 'Semestre_date'
