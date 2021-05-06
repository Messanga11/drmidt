from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .forms import *
from .models import *

type_courier = {
    ('A', 'Arrive'),
    ('D', 'Depart'),
}

def loginPage(request):
    if request.user:
        if request.method == 'POST':
            nom = request.POST.get('nom')
            mot_de_passe = request.POST.get('mot_de_passe')
            user = authenticate(username=nom, password=mot_de_passe)
            if user is not None:
                login(request, user)
                return redirect('accueil')
            else:
                messages.info(request, 'Nom ou Mot de passe incorrect')
    else:
        return redirect("accueil")
    context = {}
    return render(request, 'login.html', context)


@login_required(login_url='/')
def enregistrement(request):
    context = {
    }
    if request.method == 'POST':  # S'il s'agit d'une requête POST
        form = CourierForm(request.POST)  # Nous reprenons les données

        if form.is_valid():  # Nous vérifions que les données envoyées sont valides
            # Ici nous pouvons traiter les données du formulaire
            types = form.cleaned_data['types']
            isAlsoOther = form.cleaned_data['aussi_autre_type']
            expediteur = form.cleaned_data['expediteur']
            destinataire = form.cleaned_data['destinataire']
            date = form.cleaned_data['date']
            date_other = form.cleaned_data['date_autre_type']
            objet = form.cleaned_data['objet']
            numero_ordre = form.cleaned_data['numero_ordre']
            numero_correspondance = form.cleaned_data['numero_correspondance']
            observations = form.cleaned_data['observations']

            Courier.objects.create(
                types=types,
                isAlsoOther=isAlsoOther,
                expediteur=expediteur,
                destinataire=destinataire,
                date=date,
                date_other=date_other,
                objet=objet,
                numero_ordre=numero_ordre,
                numero_correspondance=numero_correspondance,
                observations=observations)

            context["envoi"] = True
            if types == 'Arrive':
                redirect('liste_arrive')
            else:
                redirect('liste_depart')
    else:  # Si ce n'est pas du POST, c'est probablement une requête GET
        context['form'] = CourierForm()  # Nous créons un formulaire vide

    return render(request, 'enregistrement.html', context)

@login_required(login_url='/')
def logoutUser(request):
    logout(request)
    return redirect('login')

@login_required(login_url='/')
def accueil(request):
    courriers = Courier.objects.order_by('-date')
    courriersFront = []
    for courrier in courriers:
        parcourt = Transmission.objects.filter(courier=courrier)
        courriersFront.append({
            'courrier': courrier,
            'parcourt': parcourt
        })
    user = request.user
    context = {'user': user, 'courriers': courriersFront}
    context['form'] = CourierForm()
    return render(request, 'accueil.html', context)

@login_required(login_url='/')
def liste_arrive(request):
    arrives = Courier.objects.filter(types='A')
    context = {'arrives': arrives}
    context['form'] = CourierForm()
    return render(request, 'liste_arrive.html', context)

@login_required(login_url='/')
def liste_depart(request):
    depart = Courier.objects.filter(types='D')
    context = {'depart': depart}
    context['form'] = CourierForm()
    return render(request, 'liste_depart.html', context)

@login_required(login_url='/')
def transmission(request, id):
    if request.method == "POST":
        courier = Courier.objects.get(pk=id)
        expediteur = User.objects.get(pk=request.user.id)
        Transmission.objects.create(courier=courier, destinataire=User.objects.get(pk=request.POST.get("destinataire")),
                                    observations=request.POST.get("observations"), expediteur=expediteur)
        context = {
            "trans": 1,
            "courier": courier,
        }
        return render(request, "transmission.html", context)
    transmissions = Transmission.objects.all()
    couriers = Courier.objects.all()
    users = User.objects.exclude(id=request.user.id)
    context = {
        "transmissions": transmissions,
        "couriers": couriers,
        "users": users
    }
    context['form'] = CourierForm()
    return render(request, "transmission.html", context)

@login_required(login_url='/')
def courier_transmis(request, slug):
    user = None
    userSMGCM = User.objects.get(username="messanga")
    userSIDTPI = User.objects.get(username="EZYVAL")
    userSAG = User.objects.get(username=request.user.username)
    userBRCAM = User.objects.get(username=request.user.username)
    if(slug=="all"):
        user = User.objects.get(pk=request.user.id)
    else:
        users = UserDR.objects.all()
        for u in users:
            if "-" in slug:
                if u.bureau == slug.split("-")[1]:
                    if u.poste == "C":
                        user = u.user
            else:
                if u.service == slug:
                    user = u.user
        
    transmission = Transmission.objects.filter(destinataire=user)
    context = {'transmission': transmission,
               'countSAG': Transmission.objects.filter(destinataire=userSAG).count(),
               'countSMGCM': Transmission.objects.filter(destinataire=userSMGCM).count(),
               'countSIDTPI': Transmission.objects.filter(destinataire=userSIDTPI).count(),
               'countBRCAM': Transmission.objects.filter(destinataire=userBRCAM).count(),
               }
    context['form'] = CourierForm()
    return render(request, 'courier_transmis.html', context)

@login_required(login_url='/')
def recevoir(request, id):
    trans = Transmission.objects.get(pk=id)
    user = User.objects.get(pk=request.user.id)
    print(trans, trans.destinataire == user)
    if trans.destinataire == user:
        trans.isReceived = True
        trans.save()
        context = {
            }
        context['form'] = CourierForm()
        return redirect('/courier_transmis/all')
    return redirect('accueil')

