from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, Property, AuditTransaction
from .serializers import UserSerializer, PropertySerializer, AuditTransactionSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'location', 'owner_name', 'property_id']
    ordering_fields = ['created_at', 'price_audit_value']

    def perform_create(self, serializer):
        serializer.save(registered_by=self.request.user)

    def get_queryset(self):
        queryset = Property.objects.all()
        # Filter by various fields if provided in query params
        location = self.request.query_params.get('location')
        if location:
            queryset = queryset.filter(location__icontains=location)
        
        verification_status = self.request.query_params.get('verification_status')
        if verification_status:
            queryset = queryset.filter(verification_status=verification_status)
            
        fraud_risk = self.request.query_params.get('fraud_risk_level')
        if fraud_risk:
            queryset = queryset.filter(fraud_risk_level=fraud_risk)
            
        return queryset

class AuditTransactionViewSet(viewsets.ModelViewSet):
    queryset = AuditTransaction.objects.all()
    serializer_class = AuditTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(auditor=self.request.user)
