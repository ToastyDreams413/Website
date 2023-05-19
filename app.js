gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

gsap.utils.toArray('.section').forEach(section => {
    ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        pin: true,
        pinSpacing: false
    })
})



const sections = document.querySelectorAll('.section');
var currentSectionNum = 1;
var prevSectionNum = 1;

function findGreatestHeight() {
  var sectionNum = 0;
  var nextNegative = 0;
  var foundZero = false;
  for (let i = 0; i < sections.length; i++) {
    var curHeight = sections[i].getBoundingClientRect().top;
    if (curHeight == 0) {
      sectionNum = i;
      foundZero = true;
      break;
    }
    else if (curHeight < 0) {
      nextNegative = i;
    }
  }
  if (!foundZero) {
    sectionNum = nextNegative;
  }
  if (sectionNum != sections.length - 1) {
    if (sections[sectionNum + 1].getBoundingClientRect().top < window.innerHeight / 2 && sections[sectionNum + 1].getBoundingClientRect().top < window.innerHeight) {
      sectionNum += 1;
    }
  }
  currentSectionNum = sectionNum + 1;
  if (currentSectionNum != prevSectionNum) {
    var originalCircle = document.getElementById("circle-" + prevSectionNum);
    var newCircle = document.getElementById("circle-" + currentSectionNum);
    changeCircles(originalCircle, newCircle);
    prevSectionNum = currentSectionNum;
  }
}

window.addEventListener('scroll', findGreatestHeight);
window.addEventListener('load', findGreatestHeight);

function scrollToSection(sectionNum) {
  console.log("Current section num: " + currentSectionNum);
  var innerHeight = 0;
  for (var i = 0; i < sectionNum - 1; i++) {
    innerHeight += sections[i].offsetHeight;
  }
  gsap.to(window, {
    duration: 1.2,
    scrollTo: {y: innerHeight, autoKill: false}
  });
  prevSectionNum = currentSectionNum;
}

function changeCircles(originalCircle, newCircle) {
  originalCircle.classList.remove("selected");
  newCircle.classList.add("selected");
}



var lastScrollTop = 0;
const introText = document.getElementById("intro");
const nameText = document.getElementById("name");
const scrolldown = document.getElementById("scrolldown");
const fixedSectionsDiv = document.getElementById("fixed-sections-div");
const fixedIconsDiv = document.getElementById("fixed-icons-div");
const fixedCirclesDiv = document.getElementById("fixed-circles-div");
var sectionsDivVisible = true;

window.addEventListener("scroll", function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop < lastScrollTop) {
    // User is scrolling upward
    if (!sectionsDivVisible) {
      sectionsDivVisible = true;
      fixedSectionsDiv.classList.add("visible");
    }
  }
  else {
    if (sectionsDivVisible) {
      sectionsDivVisible = false;
      fixedSectionsDiv.classList.remove("visible");
    }
    console.log("Scrolling downward!");
  }
  
  lastScrollTop = scrollTop;
});




const text1 = "Crafting solutions for everyday life through the";
const text2 = "synergy of software, hardware, and mathematics.";
const typingSpeed = 80;

let index = 0;
const intro = document.getElementById("intro");
const myName = document.getElementById("name");
const typedText1 = document.getElementById("typed-text");
const typedText2 = document.getElementById("typed-text-two");

function type1() {
  if (index < text1.length) {
    typedText1.textContent += text1.charAt(index);
    index++;
    setTimeout(type1, typingSpeed);
  }
  else {
    setTimeout(() => {
      typedText2.textContent = "";
      typedText2.style.color = "#E7DFDD";
      type2();
    }, typingSpeed);
  }
}

let index2 = 0;
function type2() {
  if (index2 < text2.length) {
    typedText2.textContent += text2.charAt(index2);
    index2++;
    setTimeout(type2, typingSpeed);
  } else {
    typedText2.classList.add("blink");
  }
}

var started = false;

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    intro.classList.add("visible");
    myName.classList.add("visible");
    scrolldown.classList.add("visible");
  }, 100);
  setTimeout(() => {
    typedText1.textContent = "";
    typedText1.style.color = "#E7DFDD";
    fixedSectionsDiv.classList.add("visible");
    fixedIconsDiv.classList.add("visible");
    fixedCirclesDiv.classList.add("visible");
    type1();
  }, 1210);
})


const aboutHeading = document.getElementById("about-heading");
const texts = ["About Me", "About Me.", "About Me..", "About Me..."];
let currentIndex = 0;

function switchText() {
  aboutHeading.textContent = texts[currentIndex];
  currentIndex = (currentIndex + 1) % texts.length;
}

var scrolled = false;

function handleTripleDots() {
  if (!scrolled) {
    setInterval(switchText, 900);
    scrolled = true;
  }
}



var fadeElements = document.querySelectorAll('.fade-in');
var fadeProjectDivs = document.querySelectorAll('.fade-in-project-div');

function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();
  var elementHeight = element.offsetHeight;
  var elementMidpoint = rect.top + elementHeight / 100 * 53;
  return (
    elementMidpoint >= 0 &&
    elementMidpoint <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function handleScroll() {
  fadeElements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('visible');
    }
  });
  fadeProjectDivs.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('scroll-trigger');
      setTimeout(() => {
        element.classList.add("scroll-done");
      }, 1200);
    }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);
/*
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    handleScroll();
  }, 100);
});
*/
window.addEventListener('scroll', handleTripleDots);

function hoverUp(element) {
  if (element.classList.contains("scroll-done")) {
    element.classList.add("hover-up");
    element.classList.remove("hover-down");
  }
}

function hoverDown(element) {
  if (element.classList.contains("scroll-done")) {
    element.classList.add("hover-down");
    element.classList.remove("hover-up");
  }
}