import { annotate } from 'https://unpkg.com/rough-notation?module';

var count = 0;

const rc = rough.canvas(document.getElementById('canvas'));

rc.circle(75, 75, 100, {
  stroke: 'black', strokeWidth: 2,
  fill: 'blue', fillStyle: 'zigzag',
  roughness: 1,
  fillWeight: 1
});

rc.circle(200, 200, 100, {
  stroke: 'black', strokeWidth: 2,
  fill: 'red', fillStyle: 'zigzag',
  roughness: 1,
  fillWeight: 1
});

rc.circle(400, 400, 100, {
  stroke: 'black', strokeWidth: 2,
  fill: 'green', fillStyle: 'zigzag',
  roughness: 1,
  fillWeight: 1
});


const body = document.querySelector('body');
body.onkeypress = function(e){step(e)};

function step(e) {
  console.log(e.code);
  if (e.code == "KeyD") {
    count = count + 1;
  } else if (e.code == "KeyA") {
    count = count - 1;
  }
  if (count < 0) {
    count = 0;
  }
  if (count == 1) {
    const n1 = document.querySelector('h1');
    n1.innerText = "Hey There";
    const a1 = annotate(n1, { type: 'circle', color: 'blue' });
    a1.show();
  } else if (count == 0) {
    const n1 = document.querySelector('h1');
    n1.innerText = "Original Text";
  }
}
