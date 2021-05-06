from django import forms

type_courier = (
    ('A', 'Arrive'),
    ('D', 'Depart'),
)


class CourierForm(forms.Form):
    types = forms.ChoiceField(choices=type_courier)
    aussi_autre_type = forms.BooleanField(required=False)
    expediteur = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=50)
    destinataire = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=50)
    date = forms.DateField(widget=forms.SelectDateWidget)
    date_autre_type = forms.DateField(widget=forms.SelectDateWidget, required=False)
    objet = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}), max_length=1000)
    numero_ordre = forms.IntegerField(widget=forms.NumberInput(attrs={'class': 'form-control'}), )
    numero_correspondance = forms.IntegerField(widget=forms.NumberInput(attrs={'class': 'form-control'}), )
    observations = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control'}))
