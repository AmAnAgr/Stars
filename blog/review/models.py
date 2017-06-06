from django.db import models

from django.utils import timezone

# Create your models here.
class Object(models.Model):
    title       = models.CharField(max_length=220)
    body        = models.TextField()
    stars       = models.CharField(max_length=220, default=0)    # FROM 0 TO 5 (CAN BE DECIMAL)
    no_users    = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class User(models.Model):
    name = models.CharField(max_length=10, default="unknown")   # NO USE AT ALL OF THIS FIELD # FOR FUTURE USES
    time = models.DateTimeField('date created', default=timezone.now)

    def __str__(self):
        return str(self.id)

class Rate(models.Model):
    user   = models.ForeignKey('User', on_delete=models.CASCADE) # THE USER WHO RATED THIS CONTENT
    star   = models.IntegerField(default=0)              # THE NUMBER OF STARS HE GAVE FROM 0 TO 5 (ONLY INTEGER)
    obj    = models.ForeignKey('Object', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.name
