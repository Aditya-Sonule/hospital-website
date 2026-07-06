from django.contrib import admin
from .models import Department, Doctor, Appointment, TreatmentSupportDonation


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "department",
        "specialization",
        "experience_years",
        "consultation_fee",
        "available_days",
        "available_start_time",
        "available_end_time",
    )
    list_filter = ("department",)
    search_fields = ("name", "specialization")


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "appointment_type",
        "patient_name",
        "doctor",
        "department",
        "appointment_date",
        "time_slot",
        "status",
        "user",
    )
    list_filter = ("appointment_type", "status", "department", "appointment_date")
    search_fields = ("patient_name", "phone", "doctor__name")


@admin.register(TreatmentSupportDonation)
class TreatmentSupportDonationAdmin(admin.ModelAdmin):
    list_display = ("id", "donor_name", "phone", "amount", "created_at")
    search_fields = ("donor_name", "phone", "email")
