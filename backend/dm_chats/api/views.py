from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView

# serializers
from .serializers import UserWorkspaceProfileSerializer

# models
from workspaces.models import WorkspaceMembers

class MemberBaseInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, member_id):
        try:
            member = WorkspaceMembers.objects.get(id=member_id)
            request_id = request.query_params.get('request_Id')
            print(request_id)
        except Exception as e:
            print(e)
            return Response({'message':'Unable get the Member'}, 
                            status=status.HTTP_404_NOT_FOUND)
        if request_id:
            try:
                request_by = WorkspaceMembers.objects.get(id=request_id)
            except Exception as e:
                print(e)
                return Response({'message':"Unbale to get the details "},
                                 status=status.HTTP_400_BAD_REQUEST)
            
            serializer = UserWorkspaceProfileSerializer(member)
            return Response(data=serializer.data, 
                            status=status.HTTP_200_OK)
        else:
            return Response({"message":"Something wend wrong"},
                             status=status.HTTP_400_BAD_REQUEST)