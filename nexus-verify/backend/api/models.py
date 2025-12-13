from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('customer', 'Customer'),
        ('real_estate', 'Real Estate Company'),
        ('auditor', 'Auditor'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')
    
    # Add related_name to fix conflicts if needed, or rely on AUTH_USER_MODEL
    # Since we are swapping the user model, we don't strictly need to override groups/permissions 
    # if we point AUTH_USER_MODEL to this. But sometimes it's good practice to be explicit if using default auth backend.
    
    def __str__(self):
        return f"{self.username} ({self.role})"

class Property(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    property_id = models.CharField(max_length=100, unique=True) # Unique identifier
    owner_name = models.CharField(max_length=255)
    registered_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    
    # Verification Fields
    ZONING_CHOICES = [
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('industrial', 'Industrial'),
        ('agricultural', 'Agricultural'),
        ('none', 'None/Unknown'),
    ]
    zoning_status = models.CharField(max_length=20, choices=ZONING_CHOICES, default='none')
    
    FRAUD_RISK_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('unknown', 'Unknown'),
    ]
    fraud_risk_level = models.CharField(max_length=20, choices=FRAUD_RISK_CHOICES, default='unknown')
    
    VERIFICATION_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    ]
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUS_CHOICES, default='pending')
    
    price_audit_value = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class AuditTransaction(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='audits')
    auditor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='audits_performed')
    
    previous_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    new_price = models.DecimalField(max_digits=12, decimal_places=2)
    
    audit_date = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)
    
    def __str__(self):
        return f"Audit for {self.property.title} by {self.auditor.username if self.auditor else 'Unknown'}"
