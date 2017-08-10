var counter = 0;

function changeBG() {

  var imgs = [
        'url(../imgs/1.jpg)',
        'url(../imgs/3.jpg)',
        'url(../imgs/5.jpg)',
        'url(../imgs/7.jpg)',
        'url(../imgs/2.jpg)',
        'url(../imgs/4.jpg)',
        'url(../imgs/6.jpg)',
        'url(../imgs/8.jpg)'
      ];

  if (counter === imgs.length) {
        counter = 0;
  }

  document.body.style.backgroundImage = imgs[counter];
  counter++;

}

setInterval(changeBG, 2000);