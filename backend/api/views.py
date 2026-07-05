from rest_framework import generics, viewsets, filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Department, Doctor, Appointment
from .serializers import (
    RegisterSerializer,
    DepartmentSerializer,
    DoctorSerializer,
    AppointmentSerializer,
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