from django.shortcuts import render
from django.contrib.auth.decorators import login_required


from .models import CalorieLimit
# Create your views here.
@login_required
def index(request):
    if request.method == 'GET':
        limit_obj, created= CalorieLimit.objects.get_or_create(user = request.user)
        context = {'cal_limit': limit_obj}
        return render(request, 'foods/index.html', context=context)
    cal_limit = request.POST.get('cal-limit')
    updated_value = {'calorie_limit':cal_limit}

    x,created = CalorieLimit.objects.update_or_create(user = request.user, defaults=updated_value)
    limit_obj= CalorieLimit.objects.get(user = request.user)
    context = {'cal_limit': limit_obj}
    return render(request, 'foods/index.html', context=context)



