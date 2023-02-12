const NUMBER_OF_SLIDES = 26;

var slide = parseInt(document.URL.split('/').pop().split('.')[0], 10);

const footer = document.querySelector('.slide-number');
if (footer) {
  footer.innerText = slide + " of " + NUMBER_OF_SLIDES
}

const body = document.querySelector('body');
body.onkeyup = function(e){step(e)};

function step(e) {

  if (e.code != "KeyD" && e.code != "KeyA") {
    return;
  }

  if (e.code == "KeyD") {
    slide = slide + 1;
  } else if (e.code == "KeyA") {
    slide = slide - 1;
  }

  if (slide < 1) {
    slide = 1;
    return;
  }

  if (slide > NUMBER_OF_SLIDES) {
    slide = NUMBER_OF_SLIDES;
    return;
  }

  const new_slide = document.URL.split('/').slice(0, -1).join('/') + '/' + slide + '.html';
  window.location.href = new_slide;
}
