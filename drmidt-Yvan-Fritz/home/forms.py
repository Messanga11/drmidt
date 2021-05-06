from django.forms import ModelForm
from blog.models import *
from django import forms
class createPost(ModelForm):
    class Meta:
        model = Post
        fields = ["title", "category", "excerpt", "slug", "thumbnail", "body"]
class contactForm(forms.Form):
    from_email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'placeholder': "Entrez adresse email"}))
    subject = forms.CharField(max_length=100, widget=forms.NumberInput(attrs={'placeholder': "Entrez votre numéro de téléphone"}))
    message = forms.CharField(widget=forms.Textarea(attrs={'placeholder': "Entrez votre suggestion"}), required=True)