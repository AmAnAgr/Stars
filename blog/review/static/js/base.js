function rate(x, obj) // toggles appearance of stars.
{
  var i;
  for (i=1;i<=x;i++)
  {
    var e = document.getElementById(i);
    e.classList.add('glyphicon-star');
    e.classList.remove('glyphicon-star-empty');
  }
  for (i=x+1;i<=5;i++)
  {
    var e = document.getElementById(i);
    e.classList.remove('glyphicon-star');
    e.classList.add('glyphicon-star-empty');
  }

  update(x, obj);
}

function createRequest() // creates a request object
{
  try {
    request = new XMLHttpRequest();
  } catch (tryMS){
      try{
        request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (otherMS) {
          try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
          } catch(failed) {
              request = null;
          }
      }
  }
  return request;
}


function update(x, obj) { // updates the database of the user ratings
var request = createRequest();
if (request == null) {
  alert("Unable to rate, try again or update your browser");
  return;
}
var url= "rate?rating=" + escape(x) + '&obj=' + obj ;
request.open("GET", url, true);
request.onreadystatechange = updateRating;
request.send(null);

}
function updateRating() {   // gets the user star.

x = request.responseText;
document.getElementById('stars').innerHTML = parseFloat(x).toFixed(2);

}
