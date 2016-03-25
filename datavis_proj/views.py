from django.shortcuts import render


def index(request):
    context = {}
    return render(request, '../templates/index.html', context)


def technology_used(request):
    context = {}
    return render(request, '../templates/technology_used.html', context)