# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-24 20:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='action',
            name='debug_balance',
        ),
        migrations.RemoveField(
            model_name='action',
            name='delta',
        ),
    ]