
var hero = document.getElementById('hero');
// Height Variables
var windowHeight = window.innerHeight;
var scrollArea = 200 - windowHeight;

// Set Hero height to 100vh
var heroHeight = hero.offsetHeight;

window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || window.scrollTop;
    var scrollPercent = scrollTop/scrollArea || 0;
    // if(scrollPercent >= 4.1379310344827585) {
    //     scrollPercent = 4.1379310344827585;
    // } else {
    //   scrollPercent = scrollTop/scrollArea || 0;
    // }
  
    // height of hero - height of actual element to avoid the jump - scroll
    // square1.style.top = heroHeight - 111 - (scrollPercent*window.innerWidth/120) + 'px';
    // square2.style.top = heroHeight - 140 - (scrollPercent*window.innerWidth/60) + 'px';
    // square3.style.top = heroHeight - 137 - (scrollPercent*window.innerWidth/35) + 'px';
    //hero.style.height =   heroHeight/2 - (scrollPercent*30) + 'px';
  
    // Set Hero section to 100vh then on scroll switch to auto
    // allow Hero height to reduce in size
    //hero.style.minHeight = "auto";
  
    console.log(scrollPercent);
  });

  var hero = document.querySelector('.hero__content h1');

  var viewportOffset = hero.getBoundingClientRect();
  // these are relative to the viewport, i.e. the window
  var top = viewportOffset.top;

  window.addEventListener('scroll', function() {
    console.log(viewportOffset);
    console.log(top);
  });
 

  window.addEventListener('scroll', function() {
    //console.log( her + 'px');
  });