from django.contrib import admin
from .models import Object, Rate, User, Struct, Comment
# Register your models here.

admin.site.register(Object)
admin.site.register(Rate)
admin.site.register(User)
admin.site.register(Struct)
admin.site.register(Comment)