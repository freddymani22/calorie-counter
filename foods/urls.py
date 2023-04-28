from django.urls import path

from.views import index, delete_consume


urlpatterns = [
    path("",index,name='home'),
    path("delete/<int:id>/",delete_consume,name='delete')
]