from rest_framework.serializers import ModelSerializer
from .models import MissingAnnouncement, MissingInfo, MissingProtector,Pastpath, Search

# apData 직렬화 (query set > json)

class MissingAnnouncementSerializer(ModelSerializer):
    class Meta:
        model = MissingAnnouncement
        fields = '__all__'

class MissingInfoSerializer(ModelSerializer):
    class Meta:
        model = MissingInfo
        fields = '__all__'

class MissingProtectorSerializer(ModelSerializer):
    class Meta:
        model = MissingProtector
        fields = '__all__'

class PastpathSerializer(ModelSerializer):
    class Meta:
        model = Pastpath
        fields = '__all__'

class SearchSerializer(ModelSerializer):
    class Meta:
        model = Search
        fields = '__all__'