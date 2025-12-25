from django.contrib import admin
from .models import Destination,Product


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'duration', 'price')
    search_fields = ('title', 'tags', 'category')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'category')
    search_fields = ('title', 'tags', 'category')
    list_filter = ('category',)


from .models import PermitApplication
from django.utils.html import format_html

@admin.register(PermitApplication)
class PermitApplicationAdmin(admin.ModelAdmin):
    list_display = ("full_name", "permit_type", "destination", "status", "submitted_at")
    list_filter = ("status", "permit_type", "destination")
    search_fields = ("full_name", "passport_number", "citizenship_id")

    actions = ["approve_selected", "reject_selected"]

    def approve_selected(self, request, queryset):
        for app in queryset:
            app.status = "approved"
            app.permit_id = f"PMT-{app.id:05d}"
            app.rejection_reason = ""
            app.save()
        self.message_user(request, f"{queryset.count()} applications approved.")
    approve_selected.short_description = "Approve selected permits"

    def reject_selected(self, request, queryset):
        for app in queryset:
            app.status = "rejected"
            app.rejection_reason = "Fake or invalid document."
            app.save()
        self.message_user(request, f"{queryset.count()} applications rejected.")
    reject_selected.short_description = "Reject selected permits"