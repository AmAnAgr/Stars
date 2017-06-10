function rate(x, obj, e) // toggles appearance of stars.
{
  element = e.parentElement;
  var i;
  for (i=1;i<=x;i++)
  {
    var star = element.getElementsByClassName(i)[0];
    star.classList.add('glyphicon-star');
    star.classList.remove('glyphicon-star-empty');
  }
  for (i=x+1;i<=5;i++)
  {
    var star = element.getElementsByClassName(i)[0];
    star.classList.remove('glyphicon-star');
    star.classList.add('glyphicon-star-empty');
  }
  stars = element.getElementsByClassName("stars");
  update(x, obj, stars);
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


function update(x, obj, stars) { // updates the database of the user ratings
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
  if (request.readyState==4){

  x = request.responseText;    
  stars[0].innerHTML = parseFloat(x).toFixed(2);

  }
}

function display() {

  var request = createRequest();
  if ( request == null ) {
    alert("Unable to generate request ");
    return;
  }
  var url = "display?struct=InSort";
  request.open( "GET", url, true );
  request.onreadystatechange = updateContent;
  request.send(null); 

}

function updateContent() {

  if (request.readyState == 4)
  {
    x = request.responseText;
      loopy(x);
  }



}

function displayStars() {
  document.getElementById('stars').innerHTML = parseFloat(document.getElementById('stars').innerHTML).toFixed(2)
}


window.onload = init;

function init() {
  displayStars();
  document.getElementById("InSort").addEventListener( "click", display , false );
}

function loopy(x)
{  
  r = document.getElementById("post");
  r.innerHTML = "";
  j = JSON.parse(x);
  titles = Object.keys(j);
  var count = titles.length; // returns length of json data

  for (var i = 0; i < count; i++) {

    r.innerHTML = r.innerHTML + '<div class="col-md-12"><div class="panel panel-primary">\
    <div class="text-center panel-heading">' + j[titles[i]]["title"] + '</div><div class="panel-body">' + j[titles[i]]["body"] + '\
    <hr><span id="1" onclick="rate(1, {{ obj.id }})" class="glyphicon glyphicon-star-empty" aria-hidden="true">\
    </span><span id="2" onclick="rate(2, {{ obj.id }})" class="glyphicon glyphicon-star-empty" aria-hidden="true">\
    </span><span id="3" onclick="rate(3, {{ obj.id }})" class="glyphicon glyphicon-star-empty" aria-hidden="true">\
    </span><span id="4" onclick="rate(4, {{ obj.id }})" class="glyphicon glyphicon-star-empty" aria-hidden="true">\
    </span><span id="5" onclick="rate(5, {{ obj.id }})" class="glyphicon glyphicon-star-empty" aria-hidden="true">\
    </span><span id="stars">' + j[titles[i]]["rate"] + '</span></div></div></div>'

  }
}


function show_comment(e) {
  e.parentElement.parentElement.nextElementSibling.style.display = "block";
  e.style.display = "none";
}

function close_comment(e) {
  e.parentElement.parentElement.style.display = "none";
  e.parentElement.parentElement.parentElement.getElementsByClassName("comment-btn")[0].style.display="block";
}