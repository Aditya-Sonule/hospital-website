from datetime import datetime, timedelta
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, viewsets, filters, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Department, Doctor, Appointment, TreatmentSupportDonation
from .serializers import (
    RegisterSerializer,
    DepartmentSerializer,
    DoctorSerializer,
    AppointmentSerializer,
    TreatmentSupportDonationSerializer,
)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [AllowAny]


class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Doctor.objects.select_related("department").all()
    serializer_class = DoctorSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "specialization", "department__name"]


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TreatmentSupportDonationViewSet(viewsets.ModelViewSet):
    queryset = TreatmentSupportDonation.objects.all().order_by("-created_at")
    serializer_class = TreatmentSupportDonationSerializer
    permission_classes = [AllowAny]

@api_view(["GET"])
@permission_classes([AllowAny])
def available_slots(request):
    doctor_id = request.query_params.get("doctor")
    date_value = request.query_params.get("date")

    if not doctor_id or not date_value:
        return Response(
            {"error": "doctor and date are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        doctor = Doctor.objects.get(id=doctor_id)
    except Doctor.DoesNotExist:
        return Response(
            {"error": "Doctor not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if not doctor.available_start_time or not doctor.available_end_time:
        return Response(
            {"error": "Doctor availability is not configured"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        appointment_date = datetime.strptime(date_value, "%Y-%m-%d").date()
    except ValueError:
        return Response(
            {"error": "Invalid date format. Use YYYY-MM-DD."},
            status=status.HTTP_400_BAD_REQUEST
        )

    start_datetime = datetime.combine(appointment_date, doctor.available_start_time)
    end_datetime = datetime.combine(appointment_date, doctor.available_end_time)

    booked_slots = Appointment.objects.filter(
        doctor=doctor,
        appointment_date=appointment_date,
        status__in=["pending", "confirmed"],
    ).values_list("time_slot", flat=True)

    booked_slot_strings = {slot.strftime("%H:%M") for slot in booked_slots}

    slots = []
    current = start_datetime

    while current < end_datetime:
        slot_value = current.time().strftime("%H:%M")

        if slot_value not in booked_slot_strings:
            slots.append({
                "value": slot_value,
                "label": current.strftime("%I:%M %p"),
            })

        current += timedelta(minutes=15)

    return Response(slots)