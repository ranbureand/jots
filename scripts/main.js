//alert("banana");

(function() {

  var header = document.getElementsByTagName('header'), // declare variables
  jots = document.getElementsByClassName('jot'),
  navContainer = document.createElement('div'),
  nav = document.createElement('nav'),
  jot,
  jotTag,
  jotNo;

  navContainer.className = 'nav-container'; // add class .nav-container to navContainer element
  nav.className = 'nav'; // add class .nav to nav element
  navContainer.appendChild(nav); // append .nav to .nav-container

  header[0].insertBefore(navContainer, header[0].firstChild); // prepend

  for (var i = jots.length; i > 0; i--) {
    jotNo = jots.length + 1 - i;
    jot = document.createElement('a');
    jot.setAttribute('href', '#jot-' + jotNo);
    jot.setAttribute('title', 'Jot № ' + jotNo);
    //jotTag = document.createTextNode(i + ' ' + jots[i-1].dataset.tag);
    jotTag = document.createTextNode(jots[i-1].dataset.tag);
    jot.appendChild(jotTag);
    header[0].getElementsByTagName('nav')[0].appendChild(jot);
  }

  /*for (var i = 0; i <= jots.length; i++) {
    jot = document.createElement('a');
    jot.setAttribute('href', '#jot-' + (i+1));
    jot.setAttribute('title', 'Jot № ' + (i+1));
    //jotTag = document.createTextNode(i + ' ' + jots[i-1].dataset.tag);
    jotTag = document.createTextNode(jots[i+1].dataset.tag);
    jot.appendChild(jotTag);
    header[0].getElementsByTagName('nav')[0].appendChild(jot);
  }*/

  //if (!navContainer.length) return; // exit if there is no header element
  if (window.location.hash.length) return; // exit if the URL has a hash
  if (window.scrollY) return; // exit if user has already scrolled

  var top = navContainer.clientHeight;
  setTimeout(function() { window.scrollTo(0, top); }, 0);
})();
