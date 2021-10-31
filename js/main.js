makeSlideShow(".slider__content");
makeSlideShow(".information__slide");

function makeSlideShow(slide) {
    const mySlide = document.querySelectorAll(slide),
        dotSlide = document.querySelectorAll(`${slide}-dot`),
        prev = document.querySelector(".btn-prev"),
        next = document.querySelector(".btn-next");

    const ARROW_DIRECTION = {
        NEXT: 'NEXT',
        PREV: 'PREV',
        AUTO: 'AUTO'
    }

    const slideShow = {
        counter: 1,
        mySlide,
        dotSlide
    }

    navigateSlide(slideShow);
    let timer = setInterval(autoSlide, 5000);

    function autoSlide() {
        slideShow.arrowDirection = ARROW_DIRECTION.AUTO;
        navigateSlide(slideShow);
    }

    prev.addEventListener('click', function () {
        slideShow.arrowDirection = ARROW_DIRECTION.PREV;
        navigateSlide(slideShow);
        resetTimer();
    })

    next.addEventListener('click', function () {
        slideShow.arrowDirection = ARROW_DIRECTION.NEXT;
        navigateSlide(slideShow);
        resetTimer();
    })

    for (let i = 0; i < dotSlide.length; i++) {
        dotSlide[i].addEventListener('click', function () {
            slideShow.counter = i + 1;
            slideShow.arrowDirection = null;
            navigateSlide(slideShow);
            resetTimer();
        })
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(autoSlide, 5000);
    }
}

function navigateSlide(slideShow) {
    let { counter, mySlide, dotSlide, arrowDirection } = slideShow;

    if (arrowDirection === 'PREV') {
        counter--;
    } else if (arrowDirection === 'NEXT' || arrowDirection === 'AUTO') {
        counter++;
    }

    for (let i = 0; i < mySlide.length; i++) {
        mySlide[i].style.display = "none";
    }
    for (let i = 0; i < dotSlide.length; i++) {
        dotSlide[i].className = dotSlide[i].className.replace(' active-slide', '');
    }
    if (counter > mySlide.length) {
        counter = 1;
    }
    if (counter < 1) {
        counter = mySlide.length;
    }
    mySlide[counter - 1].style.display = "block";
    dotSlide[counter - 1].className += " active-slide";
    slideShow.counter = counter;
}
