from django import forms
from .models import PermitApplication

class PermitApplicationForm(forms.ModelForm):
    class Meta:
        model = PermitApplication
        fields = '__all__'