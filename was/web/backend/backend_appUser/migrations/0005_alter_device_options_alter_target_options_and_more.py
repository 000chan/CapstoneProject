# Generated by Django 4.1.1 on 2022-11-26 04:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_appUser', '0004_alter_user_table'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='device',
            options={'managed': False, 'verbose_name': 'Device', 'verbose_name_plural': 'Device'},
        ),
        migrations.AlterModelOptions(
            name='target',
            options={'managed': False, 'verbose_name': 'Target', 'verbose_name_plural': 'Target'},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'managed': False, 'verbose_name': 'User', 'verbose_name_plural': 'User'},
        ),
    ]