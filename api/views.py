from rest_framework import generics

from .serializers import FoodSerializer
from  foods.models import Food

class FoodListCreatApiView(generics.ListCreateAPIView):
    serializer_class = FoodSerializer



    def get_queryset(self):
        return Food.objects.filter(user = self.request.user)


    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class FoodRetreiveDeleteApiView(generics.RetrieveDestroyAPIView):
    serializer_class = FoodSerializer


    def get_queryset(self):
        return Food.objects.filter(user = self.request.user)