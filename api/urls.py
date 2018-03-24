from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r'account', views.AccountViewSet)
router.register(r'action', views.ActionViewSet)

urlpatterns = [
    url(r'^', include(router.urls))
]
