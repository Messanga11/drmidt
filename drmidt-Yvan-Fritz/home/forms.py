from django.forms import ModelForm
from blog.models import *
from django import forms
class createPost(ModelForm):
    class Meta:
        model = Post
        fields = ["title", "category", "excerpt", "slug", "thumbnail", "body"]
class contactForm(forms.Form):
    from_email = forms.EmailField(required=True)
    subject = forms.CharField(max_length=100, widget=forms.NumberInput())
    message = forms.CharField(widget=forms.Textarea, required=True)