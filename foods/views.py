from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.urls import reverse



from .models import Food,Consume
# Create your views here.

def index(request):

    if request.method == 'POST':
        food_consumed = request.POST.get('food_consumed')
        consume_obj = Food.objects.get(name=food_consumed)
        consume_user = request.user
        Consume.objects.create(user = consume_user, food_consumed=consume_obj)


    qs = Food.objects.all()
    consumed_qs = Consume.objects.filter(user = request.user)
    context = {'qs':qs, 'consumed_qs': consumed_qs}
    return render(request, 'foods/index.html', context=context)


def delete_consume(request, id):
    obj = get_object_or_404(Consume, id=id)
    if request.method =="POST":
        obj.delete()
        return redirect('home')
    return render(request, 'foods/delete.html')