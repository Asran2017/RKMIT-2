const historyLink = document.getElementById("history_link");
const homeLink = document.getElementById("home_link");
const scrollText = document.getElementById("scroll-text");
const itenaryLink = document.getElementById("itenary_link");
const donationLink = document.getElementById("donation_link");

const introContent = document.querySelector(".section--2");
const mantraContent = document.querySelector(".section--3");
const historyContent = document.querySelector(".section--4");
const itenaryContent = document.querySelector(".section--5");
const donationContent = document.querySelector(".section--6");
window.onload = function () {
  introContent.style.display = "block";
  mantraContent.style.display = "block";
  introContent.classList.add("section-animate");
  mantraContent.classList.add("section-animate");
  historyContent.style.display = "none";
  itenaryContent.style.display = "none";
  donationContent.style.display = "none";
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
});
homeLink.addEventListener("click", function (e) {
  e.preventDefault();
  historyContent.style.display = "none";
  itenaryContent.style.display = "none";
  donationContent.style.display = "none";
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
});
