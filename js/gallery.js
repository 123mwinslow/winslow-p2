// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
			  window.setTimeout(callback, 1000 / 60);
			};
  })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
  requestAnimFrame( animate );
  var currentTime = new Date().getTime();
  if (mLastFrameTime === 0) {
	  mLastFrameTime = currentTime;
  }

  if ((currentTime - mLastFrameTime) > mWaitTime) {
	  swapPhoto();
	  mLastFrameTime = currentTime;
  }
}

/************* DO TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
  if(mCurrentIndex < mImages.length){mCurrentIndex++} else
  {mCurrentIndex = 0};
  
  document.getElementById('photo').src = mImages[mCurrentIndex].img;
  // if(k < path3.length - 1){k++;} else
  //Add code here to access the #slideShow element.
  //Access the img element and replace its source
  //with a new image from your images array which is loaded 
  //from the JSON string
  console.log('swap photo');
}
var mImages = [];
// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Holds the retrived JSON information
var mJson;

var mUrl = 'images.json';

mRequest.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
	  mJson = JSON.parse(mRequest.responseText);
	  iterateJSON(mJson);
  }
};
mRequest.open("GET", mUrl, true);
mRequest.send();

// Array holding GalleryImage objects (see below).


//each json object inside the js array

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
  return function(e) {
	  galleryImage.img = e.target;
	  mImages.push(galleryImage);
  }
}

$(document).ready( function() {
  
  // This initially hides the photos' metadata information
  // $('.details').eq(0).hide();
  
});

window.addEventListener('load', function() {
  
  console.log('window loaded');

}, false);

function GalleryImage() { 
  let location = "";
  let description = "";
  let date = "";
  let img = "";
}

function iterateJSON(mJSON){
for(x=0; x<mJSON.images.length; x++){
  mImages[x] = new GalleryImage();
  mImages[x].location = mJson.images[x].imgLocation;
  mImages[x].description = mJson.images[x].description;
  mImages[x].date = mJson.images[x].date;
  mImages[x].img = mJson.images[x].imgPath;
}
}
