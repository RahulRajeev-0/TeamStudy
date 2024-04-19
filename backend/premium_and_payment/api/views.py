from rest_framework.views import APIView 

from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response  # Import Response class for sending HTTP responses
from rest_framework import status


# models
from workspaces.models import Workspaces
from django.shortcuts import redirect
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY



class CreateStripeCheckoutSession(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
    
        try:
            workspace_id = request.data.get('workspace_id')
            
            workspace = Workspaces.objects.get(id=workspace_id)
            if request.user != workspace.created_by:
                return Response({"message":"Only the Owner of  the workspace can buy premium"}, status=status.HTTP_403_FORBIDDEN)
            checkout_session = stripe.checkout.Session.create(
                line_items=[{
                       'price_data':{
                           'currency':'inr',
                           'unit_amount':100 * 100,
                           'product_data':{
                               'name':workspace.workspace_name,

                           }
                                    },
                       'quantity' :1 },
                ],
                       mode='payment',
                       metadata={
                            'product_id':workspace.id
                       },
                       success_url = settings.SITE_URL + '?success=true' ,
                       cancel_url = settings.SITE_URL + '?cancel=true' ,
            )
            return redirect(checkout_session.url, code=303)
        except Exception as e:
            print(e)
            return Response({'message':'something wend wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

             
