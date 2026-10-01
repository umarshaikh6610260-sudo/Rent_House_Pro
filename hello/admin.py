from django.contrib import admin

from .models import Property, ContactInquiry


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "city",
        "bhk",
        "rent",
        "available",
    )

    list_filter = (
        "city",
        "bhk",
        "available",
        "furnishing",
    )

    search_fields = (
        "title",
        "city",
        "location",
    )


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "email",
        "phone",
        "subject",
        "created_at",
        "is_resolved",
    )

    list_filter = (
        "is_resolved",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "phone",
        "subject",
        "message",
    )