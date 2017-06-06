from django.shortcuts import render
from django.http import HttpResponse

from .models import Object, Rate, User
from .helper import set_cookie

# Create your views here.
def home(request):

# obtain ip address of the user.

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')


    if 'user' in request.COOKIES:       # check if user has the cookie available
        user_id = request.COOKIES['user'] # extract user id from the cookie dictionary
    else:
        user = User(name=ip)
        user.save()    # create a new user
        user_id = user.id         # get the id of the user

    objects = Object.objects.all() # all the objects stored in the database

    context = {

        'objects' : objects,
        # 'stars'   : stars,
    }

    response = render(request, 'review/index.html', context)
    set_cookie(response, 'user', user_id,10000)

    return response


def rate(request):
    
    user_id = request.COOKIES['user']   # extract id of the user from the cookie stored previously
    obj   = request.GET.get('obj', None)    # get the object to be rated
    stars = request.GET.get('rating',None)  # get the stars rated by the user
    o = Object.objects.get(id=int(obj))
    u = User.objects.get(id=user_id)
    rated = Rate.objects.filter(user = u, obj=o)
    
    if len(rated) == 1 :

        rate = rated[0]
        s = float(o.stars)*o.no_users + float(stars) - float(rate.star)
        o.stars = s/(o.no_users)
        o.save()
        rate.star = stars
        rate.save()
    else:
        rated = Rate(user=u, star=stars, obj=o).save()
        s = float(o.stars)*o.no_users + float(stars)
        o.stars = s/(o.no_users+1)
        o.no_users += 1
        o.save()
    
    
 
    return HttpResponse(o.stars)
