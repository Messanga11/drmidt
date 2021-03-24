from rest_framework import viewsets
from .models import Tableau_de_synthese
from .serializers import Tableau_de_syntheseSerializer


class TdsView(viewsets.ModelViewSet):
    queryset = Tableau_de_synthese.objects.all().order_by('year')
    serializer_class = Tableau_de_syntheseSerializer
    http_method_names = ['get']
