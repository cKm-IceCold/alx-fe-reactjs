import requests
import sys

BASE_URL = 'http://127.0.0.1:8000/api'

def run_tests():
    # 1. Create a User (Real Estate Company)
    print("1. Creating User...")
    user_data = {
        "username": "realty_co_test",
        "email": "contact@realty.com",
        "password": "securepassword123",
        "role": "real_estate"
    }
    response = requests.post(f"{BASE_URL}/users/", json=user_data)
    if response.status_code == 201:
        print("   User created successfully:", response.json()['username'])
        user_id = response.json()['id']
    else:
        print("   Failed to create user (might already exist):", response.text)
        # proceed if it exists or stop? let's try to proceed
    
    # 2. Get Token (Not implemented yet, so use Basic Auth)
    auth = ('realty_co_test', 'securepassword123')
    
    # 3. Create a Property
    print("\n2. Creating Property...")
    property_data = {
        "title": "Luxury Villa",
        "location": "Beverly Hills",
        "property_id": "BH-90210-001",
        "owner_name": "John Doe",
        "zoning_status": "residential",
        "fraud_risk_level": "low",
        "price_audit_value": "5000000.00"
    }
    response = requests.post(f"{BASE_URL}/properties/", json=property_data, auth=auth)
    if response.status_code == 201:
        print("   Property created successfully:", response.json()['title'])
    else:
        print("   Failed to create property:", response.status_code, response.text)

    # 4. List Properties
    print("\n3. Listing Properties...")
    response = requests.get(f"{BASE_URL}/properties/", auth=auth)
    if response.status_code == 200:
        print(f"   Found {len(response.json())} properties")
    else:
        print("   Failed to list properties:", response.status_code)

if __name__ == "__main__":
    try:
        run_tests()
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to server. Is it running?")
