import { baseSections, dynamicSections } from "./components.js";
import { getIndicatorsTemplate } from "./template.js";
import { getDebounce, getThrottle } from "./utils.js";

const $sectionsWrapper = document.querySelector('.sections');
const $indicatorsWrapper = document.querySelector('.indicators');

const DELAY = 1000;

let sectionIndex = 0;
const sections = [...baseSections];

const render = () => {
  $sectionsWrapper.innerHTML = sections.join("");
  $indicatorsWrapper.innerHTML = getIndicatorsTemplate(sections.length);
}

const loadMoreSection = getDebounce(() => {
  if (sections.length >= baseSections.length + dynamicSections.length) {
    return;
  }

  const newSectionIndex = sections.length - baseSections.length;
  sections.push(dynamicSections[newSectionIndex]);
  render();
}, DELAY)

const moveScreen = (sectionIndex) => {
  const $section = document.querySelector(`#section-${sectionIndex}`);

  window.scrollTo({
    top: $section.offsetTop,
    behavior: "smooth"
  }) 
}

const scrollToSection = getThrottle((direction) => {
  if (direction === "up" && sectionIndex > 0) {
    sectionIndex -= 1;
    moveScreen(sectionIndex);
  }

  if (direction === "down" && sectionIndex < sections.length - 1) {
    sectionIndex += 1;
    moveScreen(sectionIndex);
  }

  if (sectionIndex === sections.length - 1) {
    loadMoreSection();
  }
}, DELAY)

window.addEventListener('wheel', (event) => {
  event.preventDefault();

  if (event.deltaY < 0) {
    scrollToSection("up");
  } else {
    scrollToSection("down");
  }
}, {
  passive: false
})


render();
