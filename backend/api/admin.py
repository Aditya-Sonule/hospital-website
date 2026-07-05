from django.contrib import admin
from .models import Department, Doctor, Appointment


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
    )
    list_filter = ("department",)
    search_fields = ("name", "specialization")


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "patient_name",
        "doctor",
        "department",
        "appointment_date",
        "time_slot",
        "status",
        "user",
    )
    list_filter = ("status", "department", "appointment_date")
    search_fields = ("patient_name", "phone", "doctor__name")