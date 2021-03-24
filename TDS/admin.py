from django.contrib import admin
from .models import Tableau_de_synthese


# Register your models here.

# admin.site.register(Local_stats)

@admin.register(Tableau_de_synthese)
class Tableau_de_syntheseAdmin(admin.ModelAdmin):
    list_display = ('department', 'class_type', 'Semestre', 'year', 'nombre_de_ec_en_activite', 'nombre_de_ec_nouveaux',
                    'nombre_de_ec_fermes',  'taux_de_augmentation_or_regression',  'nombre_de_ec_programmes',
                    'nombre_de_ec_inspectes',  'taux_de_couverture',  'nombre_de_ec_autorise_or_declares',
                    'taux_de_conformite',  'montant_des_ESD_generes_or_superficiaires',
                    'montant_des_ESD_generes_au_titre_des_FVAPG_et_FVAPVE',  'total',)
    list_filter = ('department', 'class_type', 'created',)
    date_hierarchy = 'created'

