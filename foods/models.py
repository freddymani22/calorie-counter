from django.db import models
from django.urls import reverse

from django.conf import settings

User = settings.AUTH_USER_MODEL



# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=100)
    carbs = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    calories = models.IntegerField()


    def __str__(self):
        return self.name




class Consume(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    food_consumed = models.ForeignKey(Food, on_delete=models.CASCADE)



    def delete_absolute_url(self):
        return reverse('delete', kwargs={'id':self.id})

