var gallery = document.querySelector(".gallery");

var images = gallery.querySelectorAll("img");

for (var i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function() {
    var image = this;
    var caption = document.querySelector("#caption");
    caption.innerHTML = image.alt;
  });
}
