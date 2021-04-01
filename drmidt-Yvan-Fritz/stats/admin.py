from django.contrib import admin
from .models import Local_stat


# Register your models here.

# admin.site.register(Local_stats)

@admin.register(Local_stat)
class Local_statsAdmin(admin.ModelAdmin):
    list_display = ('department', 'money', 'created', 'updated', )
    list_filter = ('created', 'updated',)
    search_fields = ('department', 'created', 'updated',)
    date_hierarchy = 'created'
    ordering = ('money',)
