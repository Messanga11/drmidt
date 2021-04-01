from rest_framework import serializers

from .models import Local_stat


class Local_statSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Local_stat
        fields = ('url', 'id', 'department', 'money', 'recovered')
