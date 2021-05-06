from django.db import models


from django.contrib.auth.models import User


from django.utils import timezone


poste = {


    ('DR', 'Delegue Regional'),

    ('CB', 'Chef de Brigade de Contôle des Activités Minières'),
    ('CSIDTPI', 'Chef Service Industrie et Developpement Technologique et Propriété Industrielle'),
    ('CSMGCM', 'Chef Service Mines Géologie et Cadastre Minier'),
    ('CSAG', 'Chef Service Affaires Generales'),

    ('CBC', 'Chef de Bureaux du Courrier'),
    ('CBB', 'Chef de Bureaux du Budget'),
    ('CBP', 'Chef de Bureaux du Personnel'),
    
    ('CBCM', 'Chef de Bureaux du Cadastre Minier'),
    ('CBMG', 'Chef de Bureaux Mine et Geologie'),
    ('CL', 'Chef de Laboratoire'),

    ('CBSEI', 'Chef de Bureaux de Suivi des Entreprises Industrielles'),
    ('CBSN', 'Chef de Bureaux de Suivi de la Normalisation'),
    ('CBDTPI', 'Chef de Bureaux du Developpement Technologique'),
    
    ('CMR1', 'Controleur Miner Régional N1'),
    ('CMR2', 'Controleur Miner Régional N2'),

    ('C', 'Cadres'),


}


service = {


    ('SMGCM', 'Mines Géologie et Cadastre Minier'),
    ('SIDTPI', 'Industrie et Developpement Technologique et Propriété Industrielle'),
    ('SAG', 'Affaires Generales'),
    ('BRCAM', 'Brigade de Contôle des Activités Minières'),


}

bureaux = {
    ('BSEI', 'Bureau de Suivi des Entreprises Industrielles'),
}



type_courier = {


    ('A', 'Arrive'),


    ('D', 'Depart'),


}



class Courier(models.Model):


    types = models.CharField(max_length=10, choices=type_courier)


    isAlsoOther = models.BooleanField(default=False)


    expediteur = models.CharField(max_length=50)


    destinataire = models.CharField(max_length=50)


    date = models.DateField(null=True)


    date_other = models.DateField(null=True)


    objet = models.CharField(max_length=1000)


    numero_ordre = models.IntegerField()


    numero_correspondance = models.IntegerField()


    observations = models.CharField(max_length=500)





class UserDR(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    poste = models.CharField(max_length=50, choices=poste, default="")
    service = models.CharField(max_length=50, choices=service, default="")
    bureau = models.CharField(max_length=50, choices=bureaux, default="")


    def __str__(self):

        return f'{self.user}'



class Transmission(models.Model):


    courier = models.ForeignKey(Courier, null=True, on_delete=models.SET_NULL, related_name='courier')


    destinataire = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='destinataire')


    expediteur = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='expediteur')


    observations = models.CharField(max_length=1000, default="")


    date_transmission = models.DateField(default=timezone.now)


    isReceived = models.BooleanField(default=False)



    def __str__(self):


        return self.courier.destinataire