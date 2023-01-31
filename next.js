const NUMBER_OF_SLIDES = 2;

var slide = parseInt(document.URL.split('/').pop().split('.')[0], 10);

const footer = document.getElementById('foot');
footer.innerText = "Slide " + slide;

const body = document.querySelector('body');
body.onkeydown = function(e){step(e)};

function step(e) {

  if (e.code == "KeyD") {
    slide = Math.min(NUMBER_OF_SLIDES - 1, slide + 1);
  } else if (e.code == "KeyA") {
    slide = Math.max(0, slide - 1)
  }

  const new_slide = document.URL.split('/').slice(0, -1).join('/') + '/' + slide + '.html';
  window.location.href = new_slide;
}
