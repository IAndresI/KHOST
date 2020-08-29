"use strict";
document.addEventListener("DOMContentLoaded", function () {
  $(".preview__select, select").styler({});
  $(".review__inner").slick({
    centerMode: true,
    slidesToShow: 3,
    infinite: false,
    dots: true,
    autoplaySpeed: 10000,
    arrows: false,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  function particle({
    lifeTime = 10000,
    creationInterval = 400,
    container,
    maximumWidth = 50,
    additionalClass,
    bottomPadding = 0
  }) {
    const section = document.querySelector(container),
      parent = section.parentElement,
      colors = ["#2854aa", "#0a98b1", "#a1284d", "#8c43ff", "#9a3a63", "#5c46cd", "219174"],
      type = ["p", "t", "c"],
      figure = document.createElement("span"),
      figureColor = colors[Math.floor(Math.random() * colors.length)],
      figureType = type[Math.floor(Math.random() * type.length)],
      figureSize = (Math.random() * maximumWidth);
    section.style.width = parent.offsetWidth + "px";
    section.style.height = parent.offsetHeight + "px";
    section.style.overflow = "hidden";
    window.addEventListener("resize", function resizeForParticles() {
      section.style.width = parent.offsetWidth + "px";
      section.style.height = parent.offsetHeight + "px";
      section.style.overflow = "hidden";
    });
    if (additionalClass) figure.classList.add(additionalClass);
    let figureTop = Math.random() * innerHeight;
    if (figureTop >= parent.offsetHeight - bottomPadding) figureTop = parent.offsetHeight - bottomPadding;
    figure.style.position = "absolute";
    figure.style.width = figure.style.height = figureSize + "px";
    figure.style.left = Math.random() * document.documentElement.offsetWidth + "px";
    figure.style.top = figureTop + "px";
    figure.style.backgroundColor = figureColor;
    switch (figureType) {
      case "p":
        figure.style.clipPath = "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)";
        break;
      case "c":
        figure.style.borderRadius = "50%";
        break;
      case "t":
        figure.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
        break;
      default:
        figure.style.borderRadius = "50%";
        break;
    }
    if (Math.random() < 0.4) figure.style.boxShadow = `0 0 10px 20px ${figureColor}`;
    section.append(figure);
    setTimeout(() => {
      figure.remove();
    }, lifeTime);
    setTimeout(function () {
      particle({
        lifeTime: lifeTime,
        creationInterval: creationInterval,
        container: container,
        maximumWidth: maximumWidth,
        additionalClass: additionalClass,
        bottomPadding: bottomPadding
      });
    }, creationInterval);
  }

  particle({
    lifeTime: 10000,
    creationInterval: 300,
    container: ".preview__figure-container",
    maximumWidth: 50,
    additionalClass: "preview__figure",
    bottomPadding: 150
  });

  let menuButton = document.querySelector(".header__nav-mini"),
    menu = document.querySelector(".nav__list");

  menuButton.addEventListener("click", function () {
    menu.classList.toggle("nav__list--opened");

    if (menu.classList.contains("nav__list--opened")) {
      menuButton.classList.add("header__nav-mini--active");
    } else {
      menuButton.classList.remove("header__nav-mini--active");
    }
  });

  let planButtons = document.querySelectorAll(".plan__button"),
    activeSpan = document.querySelector(".plan__active-span"),
    tarifs = document.querySelectorAll(".plan__tarif"),
    tarifsPrice = document.querySelectorAll(".plan__price");
  planButtons.forEach(element => {
    element.addEventListener("click", function (e) {
      planButtons.forEach(element => {
        element.classList.remove("plan__button--active");
      });
      if (e.target.getAttribute("data-side") == "right") {
        activeSpan.style.transform = "translateX(100%)";
        activeSpan.style.backgroundSize = "100%";
        tarifs.forEach(element => {
          element.classList.add("plan__tarif--yearly");
        });
        setTimeout(() => {
          tarifsPrice.forEach(element => {
            if (element.classList.contains("plan__price--yearly")) {
              element.style.display = "block";
            } else {
              element.style.display = "none";
            }
          });
        }, 400);
      } else {
        activeSpan.style.transform = "translateX(0)";
        activeSpan.style.backgroundSize = "200%";
        tarifs.forEach(element => {
          element.classList.remove("plan__tarif--yearly");
        });
        setTimeout(() => {
          tarifsPrice.forEach(element => {
            if (element.classList.contains("plan__price--yearly")) {
              element.style.display = "none";
            } else {
              element.style.display = "block";
            }
          });
        }, 400);
      }
      e.target.classList.add("plan__button--active");
    });
  });

  function startAnimation({
    elements,
    triggerClass,
    triggerHeight = 100,
    infinity = false,
    trough = {
      number: 0,
      withFirst: false
    }
  }) {

    function animationTrigger(element) {
      if ((window.pageYOffset + window.innerHeight - triggerHeight > element.getBoundingClientRect().top + window.pageYOffset) && (element.getBoundingClientRect().top + window.pageYOffset > window.pageYOffset + triggerHeight - element.offsetHeight)) {
        element.classList.add(triggerClass);
        element.style.visibility = "visible";
      } else if (infinity) {
        element.classList.remove(triggerClass);
        element.style.visibility = "hidden";
      }
    }

    function trigger(element) {
      animationTrigger(element);
      window.addEventListener("scroll", () => {
        animationTrigger(element);
      });
    }

    if (elements.length > 1) {
      elements.forEach((element) => {
        element.style.visibility = "hidden";
      });
      if (trough) {
        let temp = trough.number;
        if (trough.withFirst) {
          elements.forEach((element, i) => {
            if (trough.withFirst) {
              trigger(element);
              trough.withFirst = false;
            }

            if (trough.withFirst == false) {
              if (i == temp + 1) {
                trigger(element);
                temp += trough.number + 1;
              }
            }
          });
        } else {
          elements.forEach((element, i) => {
            if (i == temp) {
              trigger(element);
              temp += trough.number + 1;
            }
          });
        }
      }
    } else {
      let element;
      elements.length == 1 ? element = elements[0] : element = elements;
      element.style.visibility = "hidden";
      trigger(element);
    }
  }

  let titleImage = document.querySelectorAll(".title__image"),
    titleMain = document.querySelectorAll(".title__main"),
    titleText = document.querySelectorAll(".title__text"),
    titleLineLeft = document.querySelectorAll(".title__line:nth-child(2n + 2)"),
    titleLineRight = document.querySelectorAll(".title__line"),
    technologyItem = document.querySelectorAll(".technology__item"),
    preview = document.querySelectorAll(".preview__container"),
    worldDot = document.querySelectorAll(".world__dot"),
    chooseName = document.querySelectorAll(".choose__name"),
    chooseTitle = document.querySelectorAll(".choose__title"),
    chooseText = document.querySelectorAll(".choose__text"),
    chooseImage = document.querySelectorAll(".choose__image"),
    reviewItem = document.querySelectorAll(".review .slick-slide"),
    questionItem = document.querySelectorAll(".question__item"),
    questionItemSecond = document.querySelectorAll(".question__item:nth-child(2n+2)"),
    teamItem = document.querySelectorAll(".team__item"),
    started = document.querySelectorAll(".started__inner"),
    header = document.querySelectorAll(".header");

  startAnimation({
    elements: titleImage,
    triggerClass: 'animate-top-to-down',
    infinity: true,
    triggerHeight: 0
  });

  startAnimation({
    elements: titleMain,
    triggerClass: 'animate-right-sm',
  });

  startAnimation({
    elements: titleText,
    triggerClass: 'animate-left-sm',
  });

  startAnimation({
    elements: titleLineLeft,
    triggerClass: 'animate-right',
    infinity: true,
    triggerHeight: 0
  });

  startAnimation({
    elements: titleLineRight,
    triggerClass: 'animate-left',
    infinity: true,
    triggerHeight: 0
  });

  startAnimation({
    elements: technologyItem,
    triggerClass: 'animate-down',
  });

  startAnimation({
    elements: preview,
    triggerClass: 'animate-scale-in',
    infinity: true
  });

  startAnimation({
    elements: worldDot,
    triggerClass: 'animate-scale-in',
  });

  startAnimation({
    elements: chooseName,
    triggerClass: 'animate-right-sm',
    trough: {
      number: 1,
    }
  });

  startAnimation({
    elements: chooseTitle,
    triggerClass: 'animate-right-sm',
    trough: {
      number: 1,
    }
  });

  startAnimation({
    elements: chooseText,
    triggerClass: 'animate-right-sm',
    trough: {
      number: 1,
    }
  });

  startAnimation({
    elements: chooseImage,
    triggerClass: 'animate-left-sm',
    trough: {
      number: 1
    }
  });

  startAnimation({
    elements: chooseName,
    triggerClass: 'animate-left-sm',
    trough: {
      number: 1,
      withFirst: true
    }
  });

  startAnimation({
    elements: chooseTitle,
    triggerClass: 'animate-left-sm',
    trough: {
      number: 1,
      withFirst: true
    }
  });

  startAnimation({
    elements: chooseText,
    triggerClass: 'animate-left-sm',
    trough: {
      number: 1,
      withFirst: true
    }
  });

  startAnimation({
    elements: chooseImage,
    triggerClass: 'animate-right-sm',
    trough: {
      number: 1,
      withFirst: true
    }
  });

  startAnimation({
    elements: reviewItem,
    triggerClass: 'animate-scale-in',
  });

  startAnimation({
    elements: questionItem,
    triggerClass: 'animate-left-sm',
  });

  startAnimation({
    elements: questionItemSecond,
    triggerClass: 'animate-right-sm',
  });

  startAnimation({
    elements: teamItem,
    triggerClass: 'animate-down',
  });

  startAnimation({
    elements: started,
    triggerClass: 'animate-scale-in',
  });

  startAnimation({
    elements: header,
    triggerClass: 'animate-top',
    infinity: true
  });
});