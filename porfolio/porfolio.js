//nav list dropdown effect
const triggers = document.querySelectorAll('.nav-ul>li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('nav');
const span = document.querySelector('.span-header');
const navbar = document.querySelector('#navbar');

function handleEnter() {
  if (this.classList.contains('top')) {
    return;
  }
  this.classList.add('trigger-enter');
  setTimeout(() => {
    this.classList.contains('trigger-enter') &&
      this.classList.add('trigger-enter-active');
  }, 150);
  background.classList.add('open');
  const dropdownCoords =
    this.querySelector('.dropdown').getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    width: dropdownCoords.width,
    height: dropdownCoords.height,
    left: dropdownCoords.left - navCoords.left,
    top: dropdownCoords.top - navCoords.top,
  };
  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty(
    'transform',
    `translate(${coords.left}px, ${coords.top}px )`
  );
}
//animation for heading letter

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}

function letterEnter() {
  this.classList.add('text-animate');
}
function letterLeave() {
  this.classList.remove('text-animate');
}
//navbar fixed position
let topNav = navbar.offsetTop;
function fixedNav() {
  if (window.scrollY >= topNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

triggers.forEach((trigger) =>
  trigger.addEventListener('mouseenter', handleEnter)
);
triggers.forEach((trigger) =>
  trigger.addEventListener('mouseleave', handleLeave)
);
span.addEventListener('mouseleave', letterLeave);
span.addEventListener('mouseenter', letterEnter);
window.addEventListener('scroll', fixedNav);

//about me slide in effect --used to wrap our slide-in function
const sliderImage = document.querySelector('.slide-in');
//debounce method on listening for scroll event
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide(){
  const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
          sliderImage.classList.add('active');
        } else {
          sliderImage.classList.remove('active');
        }
}
window.addEventListener('scroll',debounce(checkSlide));

//modal for projects
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-content');
const modalText = document.querySelector('.caption');
const projs = document.querySelectorAll('.proj');
const closeButton = document.querySelector('.span-close');

projs.forEach(proj=>proj.addEventListener('click',()=>{
  const img = proj.querySelector('img').src;
  const caption = proj.querySelector('img').alt;
  
  modal.style.display ="block";
  modalImage.src = img;
  modalText.innerHTML = caption;
  


  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  body.onscroll = ()=>{window.scrollTo(scrollLeft,scrollTop)}

  
}))
closeButton.addEventListener('click',()=>{
  modal.style.display = 'none';
  body.onscroll = function(){};
});
//form and contact animation
const form = document.querySelector('form');
const contactHeader = document.querySelector('.contact-header');
const contactHeaderBar = document.querySelector('.contact-header-bar');
const highlight = document.querySelector('.highlight');



  function formPopIn(){
    
    const slideInAt = (window.scrollY + window.innerHeight) - form.offsetHeight / 2;
        // bottom of the image
        const imageBottom = form.offsetTop + form.offsetHeight*6.3;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY > imageBottom;
       
        if (isHalfShown && isNotScrolledPast) {
          form.classList.add('animated','pop-in');
          
          
          contactHeader.classList.add('slide-in-left');
          contactHeaderBar.classList.add('slide-in-right');
          highlight.classList.add('slide-in-right');
          console.log("added");
        } else {
          form.classList.remove('animated', 'pop-in');
          highlight.classList.remove('slide-in-right');
          contactHeader.classList.remove('slide-in-left');
          contactHeaderBar.classList.remove('slide-in-right');
          console.log('removed');
        }
  }
window.addEventListener('scroll',formPopIn);
//contact-form submit


const textArea = document.querySelector('textarea[type="text"]');
const emailInput = document.querySelector('.email');
const nameInput = document.querySelector('.name');
const success = document.querySelector('.success');

  
form.addEventListener('submit',function(event){
  event.preventDefault();
  
  
                   
  var formData = new FormData(this);
    formData.append('service_id', 'service_stephn2027');
    formData.append('template_id', 'template_zgxwwej');
    formData.append('user_id', 'user_ks68kcqJevR0lKS5r515W');
 
    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false, // auto-detection
        processData: false // no need to parse formData to string
        
    }).done(function() {
      textArea.value = "";
      textArea.focus();
      emailInput.value="";
      emailInput.focus();
      nameInput.value="";
      nameInput.focus();
       
      success.classList.add('expand');
        
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });
});
document.querySelector('#close')
.addEventListener('click', function(){
  
  success.classList.remove('expand');
  
});

  
  //footer icon animation
  