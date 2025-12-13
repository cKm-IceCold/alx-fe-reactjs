from rest_framework import serializers
from .models import User, Property, AuditTransaction

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'date_joined', 'password']
        read_only_fields = ['date_joined']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            role=validated_data.get('role', 'customer')
        )
        return user

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'registered_by']

class AuditTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditTransaction
        fields = '__all__'
        read_only_fields = ['audit_date', 'auditor']
