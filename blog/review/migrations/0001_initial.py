# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-03 15:46
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Object',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=220)),
                ('body', models.TextField()),
                ('stars', models.CharField(default=0, max_length=220)),
            ],
        ),
        migrations.CreateModel(
            name='Rate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip_add', models.CharField(max_length=16)),
                ('star', models.IntegerField(default=0)),
                ('obj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='review.Object')),
            ],
        ),
    ]
