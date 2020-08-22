"use strict";
document.addEventListener("DOMContentLoaded", function () {
  $(".preview__select, select").styler({});
  $(".review__inner").slick({
    centerMode: true,
    slidesToShow: 3,
    infinite: false,
    dots: true,
    autoplaySpeed: 10000,
    arrows: false
  });

  function createFigure() {
    const section = document.querySelector(".preview__figure-container"),
      colors = ["#2854aa", "#0a98b1", "#a1284d", "#8c43ff", "#9a3a63", "#5c46cd", "219174"],
      type = ["p", "t", "c"],
      shadow = Math.random(),
      figure = document.createElement("span"),
      figureColor = colors[Math.floor(Math.random() * colors.length)],
      figureType = type[Math.floor(Math.random() * type.length)],
      figureSize = Math.random() * 50;

    figure.classList.add("preview__figure");
    figure.style.width = figureSize + "px";
    figure.style.height = figureSize + "px";
    let figureTop = Math.random() * innerHeight;
    if (figureTop >= 700) figureTop = 700;
    figure.style.left = Math.random() * innerWidth - 60 + "px";
    figure.style.top = figureTop + "px";
    figure.style.backgroundColor = figureColor;
    if (figureType == "p") {
      figure.style.clipPath = "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)";
    } else if (figureType == "c") {
      figure.style.borderRadius = "50%";
    } else {
      figure.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
    }
    if (shadow < 0.4) {
      figure.style.boxShadow = `0 0 10px 20px ${figureColor}`;
    }

    section.append(figure);
    setTimeout(() => {
      figure.remove();
    }, 10000);
  }
  setInterval(createFigure, 400);

  function startAnimation({
    elements,
    triggerClass,
    triggerHeight
  }) {
    elements.forEach(element => {
      if ((pageYOffset + window.innerHeight - triggerHeight > element.getBoundingClientRect().y + pageYOffset) && (element.getBoundingClientRect().y + pageYOffset > pageYOffset + triggerHeight)) {
        element.classList.add(triggerClass);
      } else {
        element.classList.remove(triggerClass);
      }
    });
  }

  let titleImage = document.querySelectorAll(".title__image");
  window.addEventListener("scroll", () => {
    startAnimation({
      elements: titleImage,
      triggerClass: 'title__image-animation',
      triggerHeight: 0
    });
  });

  let planButtons = document.querySelectorAll(".plan__button"),
    activeSpan = document.querySelector(".plan__active-span");
  planButtons.forEach(element => {
    element.addEventListener("click", function (e) {
      planButtons.forEach(element => {
        element.classList.remove("plan__button--active");
      });
      if (e.target.getAttribute("data-side") == "right") {
        activeSpan.style.transform = "translateX(100%)";
        activeSpan.style.backgroundSize = "100%";
      } else {
        activeSpan.style.transform = "translateX(0)";
        activeSpan.style.backgroundSize = "200%";
      }
      e.target.classList.add("plan__button--active");
    });
  });
});