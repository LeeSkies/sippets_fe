// Inject HTML into a specific point in the HTML document
document.getElementById("elementId").innerHTML = "Hello, World!";

// Manipulate the URL
window.location.href = "https://www.example.com";

// Prevent unsupported videos from being displayed
if (document.createElement('video').canPlayType) {
  // Your video code here
}

// Store information on viewer's computer
localStorage.setItem('key', 'value');
localStorage.getItem('key');

// Preload images to prevent site from displaying partially
function preloadImages() {
  for (var i = 0; i < arguments.length; i++) {
    new Image().src = arguments[i];
  }
}
preloadImages(
  "https://www.example.com/image1.jpg",
  "https://www.example.com/image2.jpg",
  "https://www.example.com/image3.jpg"
);

// Validate email address
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
validateEmail('example@example.com'); // Returns true

// Disable right-click on a page
document.addEventListener('contextmenu', event => event.preventDefault());

// Display random quotes
var quotes = [
  'Quote 1',
  'Quote 2',
  'Quote 3',
  'Quote 4',
  'Quote 5'
];
var quote = quotes[Math.floor(Math.random() * quotes.length)];

// Navigate between pages
function goBack() {
  window.history.back();
}
function goForward() {
  window.history.forward();
}

// Allow viewers to bookmark a page
<a href="javascript:window.external.AddFavorite('https://www.example.com', 'Page Title')">Bookmark This Page</a>

// Print a page
window.print();

// Comment out code for debugging
console.log("Working code");
//console.log("Erroneous code);

// Remove elements from an array until the passed function returns true
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]

// Check whether the parent element contains the child
const elementContains = (parent, child) => parent !== child && parent.contains(child);
elementContains(document.querySelector('head'), document.querySelector('title')); // true
elementContains(document.querySelector('body'), document.querySelector('body')); // false

// Remove duplicate values in an array
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

// Return the first key that satisfies a given function
const findKey = (obj, fn) => Object.keys(obj).find(key => fn(obj[key], key, obj));
findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true }
  },
  o => o['active']
); // 'barney'
