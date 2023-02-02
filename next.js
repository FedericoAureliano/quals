const NUMBER_OF_SLIDES = 3;

var slide = parseInt(document.URL.split('/').pop().split('.')[0], 10);

const footer = document.querySelector('.slide-number');
footer.innerText = slide + " of " + NUMBER_OF_SLIDES

const date = document.querySelector('.date');
if (date != null) {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  date.innerText = currentDate.toLocaleDateString('en-us', options);
}

const body = document.querySelector('body');
body.onkeydown = function(e){step(e)};

function step(e) {

  if (e.code != "KeyD" && e.code != "KeyA") {
    return;
  }

  if (e.code == "KeyD") {
    slide = Math.min(NUMBER_OF_SLIDES, slide + 1);
  } else if (e.code == "KeyA") {
    slide = Math.max(1, slide - 1)
  }

  const new_slide = document.URL.split('/').slice(0, -1).join('/') + '/' + slide + '.html';
  window.location.href = new_slide;
}
