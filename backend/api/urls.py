from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    RegisterView,
    DepartmentViewSet,
    DoctorViewSet,
    AppointmentViewSet,
    TreatmentSupportDonationViewSet,
    available_slots,
)


router = DefaultRouter()
router.register("departments", DepartmentViewSet, basename="department")
router.register("doctors", DoctorViewSet, basename="doctor")
router.register("appointments", AppointmentViewSet, basename="appointment")
router.register("treatment-support", TreatmentSupportDonationViewSet, basename="treatment-support")

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("available-slots/", available_slots, name="available-slots"),
    path("", include(router.urls)),
]