
var input = document.getElementById('message');
input.addEventListener('keyup', function(event) {
  if (event.keyCode === 13 && event.keyCode === 16) {
    return;
  }
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('send').click();
  }
});





function darkModeToggle() {
  if (document.getElementById('chatify-navbar').classList.contains('chatify-darknav')) {
    document.getElementById('chatify-navbar').classList.remove('chatify-darknav');
    document.getElementById('chatify-navbar').classList.add('chatify-lightnav');
    document.getElementById('footer').classList.add('bg-light');
    document.getElementById('footer').classList.remove('chatify-darknav');
    document.getElementById('message').classList.add('chatify-lightinput');
    document.getElementById('message').classList.remove('chatify-darkinput');
    document.body.classList.toggle('chatify-dark-body');
    setCookie('colourMode', 'light');
  } else {
    document.getElementById('footer').classList.remove('bg-light');
    document.getElementById('footer').classList.add('chatify-darknav');
    document.getElementById('message').classList.remove('chatify-lightinput');
    document.getElementById('message').classList.add('chatify-darkinput');
    document.body.classList.toggle('chatify-dark-body');
    document.getElementById('chatify-navbar').classList.remove('chatify-lightnav');
    document.getElementById('chatify-navbar').classList.add('chatify-darknav');
    document.getElementById('exampleModalLabel').style.color = 'black';
    document.getElementById('exampleModalLabel1').style.color = 'black';
    setCookie('colourMode', 'dark');
  }

  if (document.getElementById('navLogo').classList.contains('chatify-navbar-brand-dark')) {
    document.getElementById('navLogo').classList.remove('chatify-navbar-brand-dark');
    document.getElementById('navLogo').classList.add('chatify-navbar-brand-light');
  } else {
    document.getElementById('navLogo').classList.remove('chatify-navbar-brand-light');
    document.getElementById('navLogo').classList.add('chatify-navbar-brand-dark');
  }
}

  var input = document.getElementById('message');
  input.focus();
  input.select();

document.getElementById('message').addEventListener("keyup", function() {
  console.log('Typing')
}, false);
