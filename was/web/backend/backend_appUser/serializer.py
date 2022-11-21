from rest_framework.serializers import ModelSerializer
from .models import User, Target, Device, testLogin

class TestSerializer(ModelSerializer):
    class Meta:
        model = testLogin
        fields = ('testid', 'testpw')

# apData 직렬화 (query set > json)

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class TargetSerializer(ModelSerializer):
    class Meta:
        model = Target
        fields = '__all__'

class SearchSerializer(ModelSerializer):
    class Meta:
        model = Device
        fields = '__all__'