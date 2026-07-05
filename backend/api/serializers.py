from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Department, Doctor, Appointment


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["id", "username", "password"]

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"]
        )


class DepartmentSerializer(serializers.ModelSerializer):
    doctors_count = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = ["id", "name", "description", "icon", "doctors_count"]

    def get_doctors_count(self, obj):
        return obj.doctors.count()


class DoctorSerializer(serializers.ModelSerializer):
    department_name = serializers.ReadOnlyField(source="department.name")

    class Meta:
        model = Doctor
        fields = [
            "id",
            "name",
            "department",
            "department_name",
            "specialization",
            "qualification",
            "experience_years",
            "consultation_fee",
            "available_days",
            "available_time",
            "image_url",
        ]


class AppointmentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    doctor_name = serializers.ReadOnlyField(source="doctor.name")
    department_name = serializers.ReadOnlyField(source="department.name")

    class Meta:
        model = Appointment
        fields = [
            "id",
            "user",
            "doctor",
            "doctor_name",
            "department",
            "department_name",
            "patient_name",
            "age",
            "phone",
            "appointment_date",
            "time_slot",
            "reason",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "user", "status", "created_at"]

    def validate_age(self, value):
        if value <= 0 or value > 120:
            raise serializers.ValidationError("Enter a valid age.")
        return value

    def validate_phone(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("Enter a valid phone number.")
        return value