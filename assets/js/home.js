Marquee3k.init();

var createStamp = function(event) {

  // Create the stamp element
  var stamp = document.createElement('span');
  stamp.classList.add('stamp');
  stamp.textContent = 'sick!';

  // Stamp is absolutely positioned. Set offset to cursor location.
  stamp.style.top = (event.clientY + window.pageYOffset) + 'px';
  stamp.style.left = (event.clientX + window.pageXOffset)  + 'px';

  var rotation =  parseInt(Math.random(3.6) * 100);
  stamp.style.transform = 'rotate(' + rotation + 'deg)';

  document.body.appendChild(stamp);
  console.log(stamp);
}

document.body.addEventListener('click', createStamp);

var button = document.querySelector('[data-clear-elements]');

var clearElements = function(className) {
  var selector = '.' + className;
  var nodes = document.querySelectorAll(selector);

  if(nodes.length === 0) {
    alert('there are no foos to clear. click anywhere on the page to add a foo');
  } else {
    nodes.forEach(function(node) {
      node.remove();
    })
  }
}

var clearStamps = function(event) {
  var className = event.target.getAttribute('data-clear-elements');
  clearElements(className);
}

button.addEventListener('click', clearStamps);
