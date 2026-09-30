from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),

    path("", views.home, name="home"),

    path("about/", views.about, name="about"),

    path("services/", views.services, name="services"),

    path("contact/", views.contact, name="contact"),

    path("properties/", views.properties, name="properties"),

    path("rating/", views.rating, name="rating"),

    path("login/", views.login, name="login"),
]