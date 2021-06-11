let modal;
let modaling;
let captionText;
let photoId;
let photoDir = "../upload_photos_normal";

window.onload = function () {
  modal = document.getElementById("modalarea");
  modalImg = document.getElementById("modalimg");
  captionText = document.getElementById("modalcaption");
  let allthumbs = document
    .getElementById("gallery")
    .getElementsByTagName("img");
  for (let i = 0; i < allthumbs.length; i++) {
    allthumbs[i].addEventListener("click", openModal);
  }
  document
    .getElementById("modalclose")
    .removeEventListener("click", closeModal);
};

function openModal(e) {
  modalImg.scr = photoDir + e.target.dataset.fn;
  photoId = e.target.dataset.id;
  captionText.innerHtml = e.target.alt;
  //nullin hinde osa
  document.getElementById("avgRating").innerHTML = "";
  for (let i = 1; i < 6; i++) {
    document.getElementById("rate" + i).checked = false;
  }
  document.getElementById("storeRating").addEventListener("click", storeRating);
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("storerating").removeEventListener;
  modal.style.display = "none";
  modalImg.src = "../images/empty.img";
}

function storeRating() {
  let rating = 0;
  for (let i = 1; i < 6; i++) {
    if (document.getElementById("rate" + i).checked) {
      rating = i;
    }
    if (rating > 0) {
      //AJAX
      let webRequest = new XMLHttpRequest();
      webRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          //mida teeme kui õnnestus
          document.getElementById("avgRating").innerHTML =
            "Keskmine hinne: " + this.responseText;
        }
      };
      webRequest.open(
        "GET",
        "store_photorating.php?rating=" + rating + "&photoid=" + photoId,
        true
      );
      webRequest.send();
      //AJAX lõppeb
    }
  }
}
