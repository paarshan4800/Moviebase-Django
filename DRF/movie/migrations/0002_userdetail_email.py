# Generated by Django 3.0.8 on 2020-07-28 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdetail',
            name='email',
            field=models.EmailField(max_length=200, null=True),
        ),
    ]
