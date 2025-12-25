from django.db import models
from django.conf import settings


class Destination(models.Model):
    title = models.CharField(max_length=100)
    tags = models.TextField(help_text="Comma-separated tags (e.g., Trekking, Cultural, Adventure)")
    duration = models.CharField(max_length=100)
    price = models.IntegerField()
    image_url = models.URLField()
    category = models.CharField(max_length=100, default='general')
    description = models.TextField(default="")

    def __str__(self):
        return self.title
    
class UserCredential(models.Model):
    username = models.CharField(max_length=50, unique=True, blank=True, null=True)
    email = models.EmailField(unique=True, null=True, blank=True)

    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    country = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.username





class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField()
    tags = models.TextField(help_text="Comma-separated tags (e.g., Electronics, Apparel)")
    category = models.CharField(max_length=100, default='general')
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    @property
    def tags_list(self):
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]

User = settings.AUTH_USER_MODEL

class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PAID', 'Paid'),
        ('FAILED', 'Failed'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')

    payment_method = models.CharField(max_length=50, default='Khalti')
    payment_reference = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.status}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    quantity = models.PositiveIntegerField()
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.title} x {self.quantity}"



class PermitApplication(models.Model):
    PERMIT_TYPE_CHOICES = [
        ('local', 'Local Tourist'),
        ('foreign', 'Foreign Tourist'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    # user = models.ForeignKey(UserCredential, on_delete=models.CASCADE, related_name="permits")
    # destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name="applications")

    permit_type = models.CharField(max_length=20, choices=PERMIT_TYPE_CHOICES)
    full_name = models.CharField(max_length=100)
    passport_number = models.CharField(max_length=50, blank=True, null=True)
    citizenship_id = models.CharField(max_length=50, blank=True, null=True)
    nationality = models.CharField(max_length=50, blank=True, null=True)
    destination = models.CharField(max_length=100)
    duration = models.PositiveIntegerField()
    purpose = models.CharField(max_length=100)
    id_document = models.FileField(upload_to='id_documents/')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    rejection_reason = models.TextField(blank=True, null=True)
    permit_id = models.CharField(max_length=20, blank=True, null=True, unique=True)

    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.full_name} ({self.status})"
    

# class PermitApplication(models.Model):
#     full_name = models.CharField(max_length=100)
#     passport_number = models.CharField(max_length=50)
#     email = models.EmailField()
#     phone_number = models.CharField(max_length=20, blank=True, null=True)
#     destination = models.CharField(max_length=100)
#     trip_duration = models.CharField(max_length=50)
#     travel_dates = models.CharField(max_length=100, blank=True, null=True)
#     special_requests = models.TextField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.full_name} - {self.destination}"


# class Category(models.Model):
#     cid = models.AutoField(primary_key=True)
#     cname = models.CharField(max_length=150)
#     description = models.TextField()

#     def __str__(self):
#         return self.cname


# class Product(models.Model):
#     id = models.AutoField(primary_key=True)
#     product_name = models.CharField(max_length=200)
#     description = models.TextField()
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)
#     created_date = models.DateTimeField(auto_now_add=True)
#     image = models.CharField(max_length=255)  
#     def __str__(self):
#         return self.product_name
    

# class Order(models.Model):
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('confirmed', 'Confirmed'),
#         ('cancelled', 'Cancelled'),
#         ('completed', 'Completed'),
#     ]

#     PAYMENT_STATUS_CHOICES = [
#         ('unpaid', 'Unpaid'),
#         ('paid', 'Paid'),
#     ]

#     user = models.ForeignKey(UserCredential, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)  # only 1 product per order
#     quantity = models.PositiveIntegerField(default=1)
#     total_price = models.DecimalField(max_digits=10, decimal_places=2)
#     transaction_id = models.CharField(max_length=100, blank=True, null=True)  # Khalti transaction ID
#     payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='unpaid')
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Order #{self.id} - {self.user.username}"