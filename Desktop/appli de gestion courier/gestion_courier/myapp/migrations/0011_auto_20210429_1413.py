# Generated by Django 3.1.4 on 2021-04-29 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0010_auto_20210429_1404'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courier',
            name='types',
            field=models.CharField(choices=[('A', 'Arrive'), ('D', 'Depart')], max_length=10),
        ),
        migrations.AlterField(
            model_name='users',
            name='typess',
            field=models.CharField(choices=[('SIDTPI', 'Industrie et Developpement Technologique et Propriété Industrielle'), ('SMGCM', 'Mines Géologie et Cadastre Minier'), ('SAG', 'Affaires Generales'), ('BRCAM', 'Brigade de Contôle des Activités Minières')], max_length=50),
        ),
    ]
