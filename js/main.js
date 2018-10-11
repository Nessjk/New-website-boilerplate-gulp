var shoot = document.querySelectorAll('.shooting--star');

function randomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function firstShooting() {
  setTimeout(() => {
    shoot.forEach(star => star.classList.add('animateStar'))

    setTimeout(() => {
      shoot.forEach(star => star.classList.remove('animateStar'))
      randomShootings();
    }, 3000);
  }, 1000);
}

function randomShootings() {
  setInterval(function(){ 
    var randomNumber = this.randomInt(0, 3);
    //console.log(randomNumber);
  
    if(this.shoot[randomNumber].classList.contains('animateStar')){
      return;

    } else {
      this.shoot[randomNumber].classList.add('animateStar');

      setTimeout(() => {
        this.shoot[randomNumber].classList.remove('animateStar')
      }, 3000);

    }

  }, 3000);
}

firstShooting();


//console.log(randomInt(0,4));
