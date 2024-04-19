from django.urls import path
from . import views

urlpatterns = [
    path('create-checkout-session/', views.CreateStripeCheckoutSession.as_view(), name='strip-payment'),
    path('payment-success/', views.StripeSuccessView.as_view(), name='strip-payment-success')

]
