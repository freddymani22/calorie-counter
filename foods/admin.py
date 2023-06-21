from django.contrib import admin

from .models import Food, CalorieLimit

# Register your models here.

class Foodadmin(admin.ModelAdmin):
     list_display  = ['id', 'name']


admin.site.register(Food,Foodadmin)
admin.site.register(CalorieLimit)


