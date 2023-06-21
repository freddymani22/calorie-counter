from django.shortcuts import render, redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib .auth.forms import AuthenticationForm,UserCreationForm
# Create your views here.

def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data = request.POST)
        if form.is_valid():
            user = form.get_user()

        # username = request.POST.get('username')
        # password = request.POST.get('password')
        # user = authenticate(request, username = username, password=password)
        # if user is None:
        #     context = {'error':'user doesnt exists'}
        #     return render(request, 'accounts/login.html', context = context)
            login(request,user)
        return redirect('/')
    
    return render(request, 'accounts/login.html', {'form': AuthenticationForm(request)})


def logout_view(request):
        logout(request)
        return redirect('accounts:login')

def register_view(request):
    form = UserCreationForm(request.POST or None)
    context = {'form': form}
    if form.is_valid():
        form.save()
        return redirect('/login')
    return render(request, 'accounts/register.html', context = context)