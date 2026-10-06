from django.db import models

class Property(models.Model):
    json_id = models.PositiveIntegerField(
    unique=True,
    null=True,
    blank=True
)

    title = models.CharField(max_length=200)
    bhk = models.PositiveSmallIntegerField(default=2)
    property_type = models.CharField(max_length=100, default="Apartment")

    rent = models.DecimalField(max_digits=10, decimal_places=2)
    deposit = models.DecimalField(max_digits=10, decimal_places=2)

    furnishing = models.CharField(max_length=50, default="Unfurnished")
    condition = models.CharField(max_length=50, default="Good")

    area_sqft = models.PositiveIntegerField(default=0)

    bedrooms = models.PositiveSmallIntegerField(default=2)
    bathrooms = models.PositiveSmallIntegerField(default=1)

    location = models.CharField(max_length=200)
    city = models.CharField(max_length=100, default="Ahmedabad")

    available = models.BooleanField(default=True)

    parking = models.BooleanField(default=False)
    balcony = models.BooleanField(default=False)
    pets_allowed = models.BooleanField(default=False)

    floor = models.PositiveIntegerField(default=0)
    total_floors = models.PositiveIntegerField(default=1)

    amenities = models.JSONField(default=list, blank=True)

    image_url = models.URLField(max_length=500, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.city}"


class ContactInquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)

    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    is_resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.subject}"