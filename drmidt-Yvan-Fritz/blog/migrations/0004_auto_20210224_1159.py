# Generated by Django 3.1.6 on 2021-02-24 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20210222_0910'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(max_length=250, unique_for_date='publish'),
        ),
        migrations.AlterField(
            model_name='post',
            name='status',
            field=models.SlugField(choices=[('actualite', 'Actualite'), ('magazine', 'Magazine'), ('annouce', 'Annouce'), ('mines', 'Mines'), ('industries', 'Industries'), ('développement_technologique', 'Développement_Technologique'), ('blog_Post', 'Blog_Post'), ('draft', 'Draft'), ('published', 'Published')], default='draft', max_length=30),
        ),
    ]
