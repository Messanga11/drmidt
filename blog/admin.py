from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'publish', 'status', 'slug', 'category',)
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('status', 'created', 'category',)
    search_fields = ('title', 'body')
    date_hierarchy = 'publish'
    ordering = ('status', 'publish')

