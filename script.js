const historyLink = document.getElementById("history_link");
const homeLink = document.getElementById("home_link");
const galleryLink = document.getElementById("gallery_link");
const scrollText = document.getElementById("scroll-text");
const itenaryLink = document.getElementById("itenary_link");
const samajamLink = document.getElementById("samajam_link");
const donationLink = document.getElementById("donation_link");
const contactLink = document.getElementById("contact_link");

const introContent = document.querySelector(".section--2");
const mantraContent = document.querySelector(".section--3");
const historyContent = document.querySelector(".section--4");
const itenaryContent = document.querySelector(".section--5");
const donationContent = document.querySelector(".section--6");
const samajamContent = document.querySelector(".section--7");
const contactContent = document.querySelector(".section--8");
const galleryContent = document.querySelector(".section--9");
window.onload = function () {
  introContent.style.display = "block";
  // introContent.classList.add("section_visible");
  // console.log(introContent);
  mantraContent.style.display = "block";
  introContent.classList.add("section-animate");
  mantraContent.classList.add("section-animate");
  historyContent.style.display = "none";
  itenaryContent.style.display = "none";
  donationContent.style.display = "none";
  samajamContent.style.display = "none";
  contactContent.style.display = "none";
  galleryContent.style.display = "none";
};
historyLink.addEventListener("click", function (e) {
  e.preventDefault();
  itenaryContent.style.display = "none";
  historyContent.style.display = "block";
  historyContent.classList.add("section-animate");
  scrollText.textContent =
    " ஸர்வத்ர கோவிந்த நாம சங்கீர்த்தனம்....கோவிந்தா கோவிந்தா...!!";
  introContent.style.display = "none";
  mantraContent.style.display = "none";
  donationContent.style.display = "none";
  samajamContent.style.display = "none";
  contactContent.style.display = "none";
  galleryContent.style.display = "none";
});
homeLink.addEventListener("click", function (e) {
  e.preventDefault();
  historyContent.style.display = "none";
  itenaryContent.style.display = "none";
  donationContent.style.display = "none";
  samajamContent.style.display = "none";
  contactContent.style.display = "none";
  galleryContent.style.display = "none";
  scrollText.textContent =
    "ஹரே ராம ஹரே ராம ராம ஹரே ஹரே... ஹரே கிருஷ்ண ஹரே கிருஷ்ண கிருஷ்ண ஹரே ஹரே!!";
  introContent.style.display = "block";
  mantraContent.style.display = "block";
  introContent.classList.add("section-animate");
  mantraContent.classList.add("section-animate");
});

itenaryLink.addEventListener("click", function (e) {
  e.preventDefault();
  itenaryContent.style.display = "flex";
  itenaryContent.classList.add("section-animate");
  scrollText.textContent =
    "ஓம் தாமோதராய வித்மஹே  ருக்மணி வல்லபாய தீமஹி  தந்நோ கிருஷ்ண: ப்ரசோதயாத்...";
  introContent.style.display = "none";
  mantraContent.style.display = "none";
  historyContent.style.display = "none";
  donationContent.style.display = "none";
  samajamContent.style.display = "none";
  contactContent.style.display = "none";
  galleryContent.style.display = "none";
});
samajamLink.addEventListener("click", function (e) {
  e.preventDefault();
  samajamContent.style.display = "block";
  samajamContent.classList.add("section-animate");
  scrollText.textContent =
    "ஸ்ரீ க்ருஷ்ண கோவிந்த ஹரே முராரே....ஹே நாத நாராயண வாசுதேவ..!!";
  introContent.style.display = "none";
  mantraContent.style.display = "none";
  donationContent.style.display = "none";
  historyContent.style.display = "none";
  itenaryContent.style.display = "none";
  contactContent.style.display = "none";
  galleryContent.style.display = "none";
});

donationLink.addEventListener("click", function (e) {
  e.preventDefault();
  donationContent.style.display = "block";
  donationContent.classList.add("section-animate");
  scrollText.textContent =
    "அச்யுதம் கேஷவம் ராம நாராயணம்...கிருஷ்ண தாமோதரம் வாசுதேவம் ஹரி..!!";
  introContent.style.display = "none";
  mantraContent.style.display = "none";
  historyContent.style.display = "none";
  itenaryContent.style.display = "none";
  samajamContent.style.display = "none";
  contactContent.style.display = "none";
  galleryContent.style.display = "none";
});
contactLink.addEventListener("click", function (e) {
  e.preventDefault();
  contactContent.style.display = "block";
  contactContent.classList.add("section-animate");
  introContent.style.display = "none";
  mantraContent.style.display = "none";
  historyContent.style.display = "none";
  itenaryContent.style.display = "none";
  samajamContent.style.display = "none";
  donationContent.style.display = "none";
  galleryContent.style.display = "none";
});

galleryLink.addEventListener("click", function (e) {
  e.preventDefault();
  galleryContent.style.display = "grid";
  galleryContent.classList.add("section-animate");
  introContent.style.display = "none";
  mantraContent.style.display = "none";
  historyContent.style.display = "none";
  itenaryContent.style.display = "none";
  samajamContent.style.display = "none";
  donationContent.style.display = "none";
  contactContent.style.display = "none";
});
const sectionArray = [
  "introContent",
  "mantraContent",
  "historyContent",
  "itenaryContent",
  "donationContent",
  "samajamContent",
  "contactContent",
];
const idArray = [
  "home_link",
  "history_link",
  "itenary_link",
  "donation_link",
  "samajam_link",
  "contact_link",
];
let clickedLink;
idArray.forEach((elt) => {
  clickedLink = document.getElementById(`${elt}`);
  console.log(clickedLink);
  clickedLink.addEventListener("click", function (e) {
    // alert("clicked");
    clickedId = e.currentTarget.id;
    console.log(clickedId);
    if (clickedId === idArray[0]) {
      `${sectionArray[0]}`.style.display = "block";
      sectionArray[1].style.display = "block";
    } else if (clickedId === idArray[1]) {
      // historyContent.style.display = "block";
    }
  });
});

//      clickedId = e.currentTarget.id;
//     if (clickedId === idArray[0]) {
//       sectionArray[0].style.display = "block";
//       sectionArray[1].style.display = "block";
//     } else if (clickedId === idArray[1]) {
//       sectionArray[3].style.display = "block";
//     }
//   });
// });

// historyLink.addEventListener("click", function (event) {
//   event.preventDefault;

//   let id = event.target.id;
//   document.getElementById(`${id}`);
//   console.log(document.getElementById(`${id}`));
// });
