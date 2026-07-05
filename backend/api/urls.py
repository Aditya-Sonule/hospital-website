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
)


router = DefaultRouter()
router.register("departments", DepartmentViewSet, basename="department")
router.register("doctors", DoctorViewSet, basename="doctor")
router.register("appointments", AppointmentViewSet, basename="appointment")


urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("", include(router.urls)),
]