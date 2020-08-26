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
    bottomPadding = 0,
    parentElement
  }) {
    const section = document.querySelector(container),
      parent = document.querySelector(parentElement),
      colors = ["#2854aa", "#0a98b1", "#a1284d", "#8c43ff", "#9a3a63", "#5c46cd", "219174"],
      type = ["p", "t", "c"],
      figure = document.createElement("span"),
      figureColor = colors[Math.floor(Math.random() * colors.length)],
      figureType = type[Math.floor(Math.random() * type.length)],
      figureSize = (Math.random() * maximumWidth);
    if (additionalClass) figure.classList.add(additionalClass);
    figure.style.position = "absolute";
    figure.style.width = figure.style.height = figureSize + "px";
    let figureTop = Math.random() * innerHeight;
    if (figureTop >= parent.offsetHeight - bottomPadding) figureTop = parent.offsetHeight - bottomPadding;
    figure.style.left = Math.random() * innerWidth - 60 + "px";
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
        bottomPadding: bottomPadding,
        parentElement: parentElement
      });
    }, creationInterval);
  }

  particle({
    lifeTime: 10000,
    creationInterval: 300,
    container: ".preview__figure-container",
    maximumWidth: 50,
    additionalClass: "preview__figure",
    bottomPadding: 150,
    parentElement: ".preview"
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
    triggerHeight,
    infinity = false,
    trough = {
      number: 0,
      withFirst: false
    }
  }) {
    function calculated(element) {
      if ((window.pageYOffset + window.innerHeight - triggerHeight > element.getBoundingClientRect().top + window.pageYOffset) && (element.getBoundingClientRect().top + window.pageYOffset > window.pageYOffset - element.offsetHeight + triggerHeight)) {
        element.classList.add(triggerClass);
      } else {
        if (infinity) {
          element.classList.remove(triggerClass);
        }
      }
    }
    if (elements.length > 1) {
      if (trough) {
        let temp = trough.number;
        if (trough.withFirst) {
          elements.forEach((element, i) => {
            if (trough.withFirst) {
              calculated(element);
              trough.withFirst = false;
            }

            if (trough.withFirst == false) {
              if (i == temp + 1) {
                calculated(element);
                temp += trough.number + 1;
              }
            }
          });
        } else {
          elements.forEach((element, i) => {
            if (i == temp) {
              calculated(element);
              temp += trough.number + 1;
            }
          });
        }
      }
    } else {
      let element;
      elements.length == 1 ? element = elements[0] : element = elements;
      calculated(element);
    }
  }

  let titleImage = document.querySelectorAll(".title__image"),
    titleMain = document.querySelectorAll(".title__main"),
    titleText = document.querySelectorAll(".title__text"),
    titleLineLeft = document.querySelectorAll(".title__line")[0],
    titleLineRight = document.querySelectorAll(".title__line")[1],
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
  window.addEventListener("scroll", () => {
    restartAnimation();
  });

  restartAnimation();

  function restartAnimation() {
    startAnimation({
      elements: titleImage,
      triggerClass: 'animate-top-to-down',
      triggerHeight: 0,
      infinity: true
    });

    startAnimation({
      elements: titleMain,
      triggerClass: 'animate-right',
      triggerHeight: 0
    });

    startAnimation({
      elements: titleText,
      triggerClass: 'animate-left',
      triggerHeight: 0
    });

    startAnimation({
      elements: titleLineLeft,
      triggerClass: 'animate-left',
      triggerHeight: 0
    });

    startAnimation({
      elements: titleLineRight,
      triggerClass: 'animate-right',
      triggerHeight: 0
    });

    startAnimation({
      elements: technologyItem,
      triggerClass: 'animate-down',
      triggerHeight: 0,
    });

    startAnimation({
      elements: preview,
      triggerClass: 'animate-scale-in',
      triggerHeight: 0,
      infinity: true
    });

    startAnimation({
      elements: worldDot,
      triggerClass: 'animate-scale-in',
      triggerHeight: 0
    });

    startAnimation({
      elements: chooseName,
      triggerClass: 'animate-right',
      triggerHeight: 0,
      trough: {
        number: 1,
      }
    });

    startAnimation({
      elements: chooseTitle,
      triggerClass: 'animate-right',
      triggerHeight: 0,
      trough: {
        number: 1,
      }
    });

    startAnimation({
      elements: chooseText,
      triggerClass: 'animate-right',
      triggerHeight: 0,
      trough: {
        number: 1,
      }
    });

    startAnimation({
      elements: chooseImage,
      triggerClass: 'animate-left',
      triggerHeight: 0,
      trough: {
        number: 1
      }
    });

    startAnimation({
      elements: chooseName,
      triggerClass: 'animate-left',
      triggerHeight: 0,
      trough: {
        number: 1,
        withFirst: true
      }
    });

    startAnimation({
      elements: chooseTitle,
      triggerClass: 'animate-left',
      triggerHeight: 0,
      trough: {
        number: 1,
        withFirst: true
      }
    });

    startAnimation({
      elements: chooseText,
      triggerClass: 'animate-left',
      triggerHeight: 0,
      trough: {
        number: 1,
        withFirst: true
      }
    });

    startAnimation({
      elements: chooseImage,
      triggerClass: 'animate-right',
      triggerHeight: 0,
      trough: {
        number: 1,
        withFirst: true
      }
    });

    startAnimation({
      elements: reviewItem,
      triggerClass: 'animate-scale-in',
      triggerHeight: -30
    });

    startAnimation({
      elements: questionItem,
      triggerClass: 'animate-left',
      triggerHeight: 0
    });

    startAnimation({
      elements: questionItemSecond,
      triggerClass: 'animate-right',
      triggerHeight: 0
    });

    startAnimation({
      elements: teamItem,
      triggerClass: 'animate-down',
      triggerHeight: 0
    });

    startAnimation({
      elements: started,
      triggerClass: 'animate-scale-in',
      triggerHeight: 0
    });

    startAnimation({
      elements: header,
      triggerClass: 'animate-top',
      triggerHeight: 0,
      infinity: true
    });
  }
});