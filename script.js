// const historyLink = document.getElementById("history_link");
// const homeLink = document.getElementById("home_link");
// const galleryLink = document.getElementById("gallery_link");
// const scrollText = document.getElementById("scroll-text");
// const itenaryLink = document.getElementById("itenary_link");
// const samajamLink = document.getElementById("samajam_link");
// const donationLink = document.getElementById("donation_link");
// const contactLink = document.getElementById("contact_link");
// const homePage = document.querySelector(".homePage");

// const introContent = document.querySelector(".section--2");
// const mantraContent = document.querySelector(".section--3");
// const historyContent = document.querySelector(".section--4");
// const itenaryContent = document.querySelector(".section--5");
// const donationContent = document.querySelector(".section--6");
// const samajamContent = document.querySelector(".section--7");
// const contactContent = document.querySelector(".section--8");
// const galleryContent = document.querySelector(".section--9");

// window.onload = function () {
//   introContent.style.display = "block";

//   mantraContent.style.display = "block";
//   introContent.classList.add("section-animate");
//   mantraContent.classList.add("section-animate");
//   historyContent.style.display = "none";
//   itenaryContent.style.display = "none";
//   donationContent.style.display = "none";
//   samajamContent.style.display = "none";
//   contactContent.style.display = "none";
//   galleryContent.style.display = "none";
// };
// historyLink.addEventListener("click", function (e) {
//   e.preventDefault();
//   itenaryContent.style.display = "none";
//   historyContent.style.display = "block";
//   historyContent.classList.add("section-animate");
//   scrollText.textContent =
//     " ஸர்வத்ர கோவிந்த நாம சங்கீர்த்தனம்....கோவிந்தா கோவிந்தா...!!";
//   introContent.style.display = "none";
//   mantraContent.style.display = "none";
//   donationContent.style.display = "none";
//   samajamContent.style.display = "none";
//   contactContent.style.display = "none";
//   galleryContent.style.display = "none";
// });
// homeLink.addEventListener("click", function (e) {
//   e.preventDefault();
//   historyContent.style.display = "none";
//   itenaryContent.style.display = "none";
//   donationContent.style.display = "none";
//   samajamContent.style.display = "none";
//   contactContent.style.display = "none";
//   galleryContent.style.display = "none";
//   scrollText.textContent =
//     "ஹரே ராம ஹரே ராம ராம ஹரே ஹரே... ஹரே கிருஷ்ண ஹரே கிருஷ்ண கிருஷ்ண ஹரே ஹரே!!";
//   introContent.style.display = "block";
//   mantraContent.style.display = "block";
//   introContent.classList.add("section-animate");
//   mantraContent.classList.add("section-animate");
// });

// itenaryLink.addEventListener("click", function (e) {
//   e.preventDefault();
//   itenaryContent.style.display = "flex";
//   itenaryContent.classList.add("section-animate");
//   scrollText.textContent =
//     "ஓம் தாமோதராய வித்மஹே  ருக்மணி வல்லபாய தீமஹி  தந்நோ கிருஷ்ண: ப்ரசோதயாத்...";
//   introContent.style.display = "none";
//   mantraContent.style.display = "none";
//   historyContent.style.display = "none";
//   donationContent.style.display = "none";
//   samajamContent.style.display = "none";
//   contactContent.style.display = "none";
//   galleryContent.style.display = "none";
// });
// samajamLink.addEventListener("click", function (e) {
//   e.preventDefault();
//   samajamContent.style.display = "block";
//   samajamContent.classList.add("section-animate");
//   scrollText.textContent =
//     "ஸ்ரீ க்ருஷ்ண கோவிந்த ஹரே முராரே....ஹே நாத நாராயண வாசுதேவ..!!";
//   introContent.style.display = "none";
//   mantraContent.style.display = "none";
//   donationContent.style.display = "none";
//   historyContent.style.display = "none";
//   itenaryContent.style.display = "none";
//   contactContent.style.display = "none";
//   galleryContent.style.display = "none";
// });

// donationLink.addEventListener("click", function (e) {
//   e.preventDefault();
//   donationContent.style.display = "block";
//   donationContent.classList.add("section-animate");
//   scrollText.textContent =
//     "அச்யுதம் கேஷவம் ராம நாராயணம்...கிருஷ்ண தாமோதரம் வாசுதேவம் ஹரி..!!";
//   introContent.style.display = "none";
//   mantraContent.style.display = "none";
//   historyContent.style.display = "none";
//   itenaryContent.style.display = "none";
//   samajamContent.style.display = "none";
//   contactContent.style.display = "none";
//   galleryContent.style.display = "none";
// });
// contactLink.addEventListener("click", function (e) {
//   e.preventDefault();
//   contactContent.style.display = "block";
//   contactContent.classList.add("section-animate");
//   introContent.style.display = "none";
//   mantraContent.style.display = "none";
//   historyContent.style.display = "none";
//   itenaryContent.style.display = "none";
//   samajamContent.style.display = "none";
//   donationContent.style.display = "none";
//   galleryContent.style.display = "none";
// });

// galleryLink.addEventListener("click", function (e) {
//   e.preventDefault();
//   galleryContent.style.display = "grid";
//   galleryContent.classList.add("section-animate");
//   introContent.style.display = "none";
//   mantraContent.style.display = "none";
//   historyContent.style.display = "none";
//   itenaryContent.style.display = "none";
//   samajamContent.style.display = "none";
//   donationContent.style.display = "none";
//   contactContent.style.display = "none";
// });
// const sectionArray = [
//   "introContent",
//   "mantraContent",
//   "historyContent",
//   "itenaryContent",
//   "donationContent",
//   "samajamContent",
//   "contactContent",
// ];
// const idArray = [
//   "#home_link",
//   "#history_link",
//   "#itenary_link",
//   "#donation_link",
//   "#samajam_link",
//   "#contact_link",
// ];
const scrollText = document.getElementById("scroll-text");

// Sections
const sections = {
  intro: document.querySelector(".section--2"),
  mantra: document.querySelector(".section--3"),
  history: document.querySelector(".section--4"),
  itenary: document.querySelector(".section--5"),
  donation: document.querySelector(".section--6"),
  samajam: document.querySelector(".section--7"),
  contact: document.querySelector(".section--8"),
  gallery: document.querySelector(".section--9"),
};

// Links + Config
const linksConfig = {
  home_link: {
    show: ["intro", "mantra"],
    display: "block",
    text: {
      ta: "ஹரே ராம ஹரே ராம ராம ஹரே ஹரே... ஹரே கிருஷ்ண ஹரே கிருஷ்ண கிருஷ்ண ஹரே ஹரே!!",
      en: "Hare Rama Hare Rama Rama Rama Hare Hare......Hare Krishna Hare Krishna Krishan Krishna Hare Hare!!",
    },
  },
  history_link: {
    show: ["history"],
    display: "block",
    text: {
      ta: "ஸர்வத்ர கோவிந்த நாம சங்கீர்த்தனம்....கோவிந்தா கோவிந்தா...!!",
      en: "Sarvatra Govinda Nama Sankeerthanam....Govinda Govinda!!",
    },
  },
  itenary_link: {
    show: ["itenary"],
    display: "flex",
    text: {
      ta: "ஓம் தாமோதராய வித்மஹே ருக்மணி வல்லபாய தீமஹி தந்நோ கிருஷ்ண: ப்ரசோதயாத்...",
      en: "Om Dhamodharaya Vidhmahe Rukmini Vallabaya Dheemahi Thanno Krishna Prachodayath!",
    },
  },
  samajam_link: {
    show: ["samajam"],
    display: "block",
    text: {
      ta: "ஸ்ரீ க்ருஷ்ண கோவிந்த ஹரே முராரே....ஹே நாத நாராயண வாசுதேவ..!!",
      en: "Sri Krishna Govinda Hare Murare.....Hey Nath Narayana Vasudeva!!",
    },
  },
  donation_link: {
    show: ["donation"],
    display: "block",
    text: {
      ta: "அச்யுதம் கேஷவம் ராம நாராயணம்...கிருஷ்ண தாமோதரம் வாசுதேவம் ஹரி..!!",
      en: "Achyutham Keshavam Rama Narayanam......Krishna Dhamodharam Vasudevam Bhaje!!",
    },
  },
  contact_link: {
    show: ["contact"],
    display: "block",
    text: {
      ta: "அபார கருணா மூர்த்திம் ஆஞ்சநேயம் நமாம் யஹம்!!",
      en: "Abara Krishna Moorthim Anjaneyam Namamyaham!!",
    },
  },
  gallery_link: {
    show: ["gallery"],
    display: "grid",
    text: "",
  },
};

// Helper: hide all sections
function hideAllSections() {
  Object.values(sections).forEach((sec) => (sec.style.display = "none"));
}

const currentLang = document.documentElement.lang; // "ta" or "en"

Object.entries(linksConfig).forEach(([id, config]) => {
  const link = document.getElementById(id);
  link.addEventListener("click", (e) => {
    e.preventDefault();
    hideAllSections();
    config.show.forEach((name) => {
      sections[name].style.display = config.display;
      sections[name].classList.add("section-animate");
    });
    if (config.text) {
      scrollText.textContent = config.text[currentLang];
    }
  });
});

// Initial load
window.onload = () => {
  hideAllSections();
  ["intro", "mantra"].forEach((name) => {
    sections[name].style.display = "block";
    sections[name].classList.add("section-animate");
  });
};

async function loadPanchangam() {
  try {
    const res = await fetch("/.netlify/functions/panchangam");
    const data = await res.json();

    document.getElementById("p-date").textContent = data.date;
    document.getElementById("p-day").textContent = data.day;
    document.getElementById("p-tithi").textContent = data.tithi;
    document.getElementById("p-nakshatra").textContent = data.nakshatra;
  } catch (err) {
    console.error("Error loading Panchangam:", err);
  }
}

loadPanchangam();
