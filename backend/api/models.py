from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Department(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name="doctors"
    )
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    qualification = models.CharField(max_length=150)
    experience_years = models.PositiveIntegerField()
    consultation_fee = models.PositiveIntegerField(default=500)
    available_days = models.CharField(max_length=150)
    available_time = models.CharField(max_length=100)
    image_url = models.URLField(blank=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="appointments"
    )
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="appointments"
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name="appointments"
    )
    patient_name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    phone = models.CharField(max_length=15)
    appointment_date = models.DateField()
    time_slot = models.CharField(max_length=50)
    reason = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient_name} - {self.doctor.name}"