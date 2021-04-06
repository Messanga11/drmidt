from django.urls import include, path
from rest_framework import routers
from . import views
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register('chartstats', views.Dept_chartView)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("statistiques/", views.index, name='stats'),
    path("", views.Dept_chartView),
    path("stats/", views.Dept_chartView),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path("d3/", TemplateView.as_view(template_name="stats/d3ia.html"))
]