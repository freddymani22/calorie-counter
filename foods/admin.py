from django.contrib import admin

from .models import Food,Consume

# Register your models here.

class Foodadmin(admin.ModelAdmin):
     list_display  = ['id', 'name']


admin.site.register(Food,Foodadmin)



admin.site.register(Consume)
