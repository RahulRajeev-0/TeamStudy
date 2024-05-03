from rest_framework.views import APIView 

from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response  # Import Response class for sending HTTP responses
from rest_framework import status


# models
from workspaces.models import Workspaces
from ..models import PremiumPayments

from django.shortcuts import redirect
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY



class CreateStripeCheckoutSession(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self,request, workspace_id):
    
        try: 
            workspace = Workspaces.objects.get(id=workspace_id)
            # if request.user != workspace.created_by:
            #     return Response({"message":"Only the Owner of  the workspace can buy premium"}, status=status.HTTP_403_FORBIDDEN)
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
                            'workspace_id':workspace.id
                       },
                       customer_email=workspace.created_by.email,
                       success_url = "https://teamstudy.rahulrajeev.online/payment/payment-success/?session_id={CHECKOUT_SESSION_ID}",
                       cancel_url = settings.SITE_URL + '?cancel=true' ,
                       
            )
            return redirect(checkout_session.url, status=status.HTTP_303_SEE_OTHER)
        except Exception as e:
            print(e)
            return Response({'message':'something wend wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

             
class StripeSuccessView(APIView):
    def get(self, request):
        try:
            session_id = request.GET.get('session_id')

            
            # Retrieve the session from Stripe to confirm payment success
            session = stripe.checkout.Session.retrieve(session_id)

            # Get the workspace ID from the session's metadata
            workspace_id = session.metadata.get('workspace_id')

            workspace = Workspaces.objects.get(id=workspace_id)
            workspace.is_premium = True
            workspace.save()

            
            # creating payment 
            PremiumPayments.objects.create(workspace=workspace)
                

            return redirect(settings.SITE_URL + '?success=true')

        except stripe.error.StripeError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )  