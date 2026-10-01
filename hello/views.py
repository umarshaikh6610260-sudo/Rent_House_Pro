import json
from pathlib import Path

from django.conf import settings
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render

from .models import Property, ContactInquiry


# ==========================================
# HOME
# ==========================================

def home(request):
    properties = Property.objects.all().order_by("-created_at")

    return render(
        request,
        "index.html",
        {
            "Flat_Data": properties
        }
    )


# ==========================================
# ABOUT
# ==========================================

def about(request):
    return render(request, "about.html")


# ==========================================
# SERVICES
# ==========================================

def services(request):
    return render(request, "services.html")


# ==========================================
# PROPERTIES
# ==========================================

def properties(request):

    search_query = request.GET.get("search", "").strip()

    property_list = Property.objects.all().order_by("-created_at")

    if search_query:

        # Normal text search
        property_list = property_list.filter(
            Q(title__icontains=search_query)
            | Q(city__icontains=search_query)
            | Q(location__icontains=search_query)
            | Q(property_type__icontains=search_query)
            | Q(furnishing__icontains=search_query)
            | Q(condition__icontains=search_query)
        )

        # 2bhk / 2 bhk / 2 BHK search
        bhk_number = search_query.lower().replace("bhk", "").strip()

        if bhk_number.isdigit():

            property_list = Property.objects.filter(
                bhk=int(bhk_number)
            )

    return render(
        request,
        "public-properties.html",
        {
            "Flat_Data": property_list,
            "search_query": search_query,
        }
    )

# ==========================================
# CONTACT
# ==========================================

def contact(request):

    if request.method == "POST":

        name = request.POST.get("name", "").strip()
        email = request.POST.get("email", "").strip()
        phone = request.POST.get("phone", "").strip()
        subject = request.POST.get("subject", "").strip()
        message = request.POST.get("message", "").strip()

        ContactInquiry.objects.create(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=message,
        )

        return render(
            request,
            "contact.html",
            {
                "success": True
            }
        )

    return render(request, "contact.html")


# ==========================================
# RATING
# ==========================================

def rating(request):
    return render(request, "rating.html")


# ==========================================
# LOGIN
# ==========================================

def login(request):
    return render(request, "login.html")


# ==========================================
# IMPORT main.json → DATABASE
# ==========================================

def import_properties(request):

    json_file = Path(settings.BASE_DIR) / "main.json"

    # Check main.json
    if not json_file.exists():

        return HttpResponse(
            "ERROR: main.json file not found."
        )

    # Read JSON
    with open(json_file, "r", encoding="utf-8") as file:
        data = json.load(file)

    # If JSON is a list
    if isinstance(data, list):

        properties_data = data

    # If JSON is inside a dictionary
    elif isinstance(data, dict):

        properties_data = (
            data.get("properties")
            or data.get("Flat_Data")
            or data.get("data")
            or []
        )

    else:

        return HttpResponse(
            "ERROR: Invalid JSON format."
        )

    created = 0
    updated = 0

    # Import every property
    for item in properties_data:

        property_obj, was_created = Property.objects.update_or_create(

            json_id=item["id"],

            defaults={

                "title": item.get(
                    "title",
                    ""
                ),

                "bhk": item.get(
                    "bhk",
                    2
                ),

                "property_type": item.get(
                    "property_type",
                    "Apartment"
                ),

                "rent": item.get(
                    "rent",
                    0
                ),

                "deposit": item.get(
                    "deposit",
                    0
                ),

                "furnishing": item.get(
                    "furnishing",
                    "Unfurnished"
                ),

                "condition": item.get(
                    "condition",
                    "Good"
                ),

                "area_sqft": item.get(
                    "area_sqft",
                    0
                ),

                "bedrooms": item.get(
                    "bedrooms",
                    item.get("bhk", 2)
                ),

                "bathrooms": item.get(
                    "bathrooms",
                    1
                ),

                "location": item.get(
                    "location",
                    ""
                ),

                "city": item.get(
                    "city",
                    "Ahmedabad"
                ),

                "available": item.get(
                    "available",
                    True
                ),

                "parking": item.get(
                    "parking",
                    False
                ),

                "balcony": item.get(
                    "balcony",
                    False
                ),

                "pets_allowed": item.get(
                    "pets_allowed",
                    False
                ),

                "floor": item.get(
                    "floor",
                    0
                ),

                "total_floors": item.get(
                    "total_floors",
                    1
                ),

                "amenities": item.get(
                    "amenities",
                    []
                ),

                "image_url": item.get(
                    "image_url",
                    ""
                ),
            }
        )

        if was_created:
            created += 1
        else:
            updated += 1

    return HttpResponse(
        f"""
        <h1>Property Import Completed</h1>

        <p>New properties created: {created}</p>

        <p>Existing properties updated: {updated}</p>

        <hr>

        <a href="/properties/">
            Open Properties
        </a>
        """
    )