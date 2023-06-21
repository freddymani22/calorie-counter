from django.urls import path


from .views import FoodListCreatApiView,FoodRetreiveDeleteApiView

urlpatterns = [
    path('',FoodListCreatApiView.as_view(), name='listfooditem'),
    path('<int:pk>/',FoodRetreiveDeleteApiView.as_view(), name='deletefooditem')
]