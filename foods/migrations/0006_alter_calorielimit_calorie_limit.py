# Generated by Django 4.2 on 2023-06-21 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foods', '0005_alter_calorielimit_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calorielimit',
            name='calorie_limit',
            field=models.IntegerField(default=2500),
        ),
    ]
