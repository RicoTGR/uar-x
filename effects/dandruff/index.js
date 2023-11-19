// use your mousewheel to zoom in 🔍

const image = document.getElementById('main-image');
const zoom = document.querySelectorAll('.zoom')[0];
const zoomImage = document.querySelectorAll('.zoom-image')[0];

let clearSrc;
let zoomLevel = 1;

let img = new Image();

img.src = bwImage;

image.setAttribute('src', img.src);


const enterImage = function(e) {
	zoom.classList.add('show', 'loading');
	clearTimeout(clearSrc);
	
	let posX, posY, touch = false;
	
	if (e.touches) {
		posX = e.touches[0].clientX;
		posY = e.touches[0].clientY;
		touch = true;
	} else {
		posX = e.clientX;
		posY = e.clientY;
	}
	
	touch
		? zoom.style.top = `${posY - zoom.offsetHeight / 1.25}px`
		: zoom.style.top = `${posY - zoom.offsetHeight / 2}px`;
	zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;
	
	
	zoomImage.setAttribute('src', originalImage);
	
	// remove the loading class
	zoomImage.onload = function() {
		console.log('hires image loaded!');
		setTimeout(() => {
			zoom.classList.remove('loading');
		}, 500);
	}
}


const leaveImage = function() {
	// remove scaling to prevent non-transition 
	zoom.style.transform = null;
	zoomLevel = 1;
	zoom.classList.remove('show');
	clearSrc = setTimeout(() => {
							 zoomImage.setAttribute('src', '');
						 }, 250);
}


const move = function(e) {
	e.preventDefault();
	
	let posX, posY, touch = false;
	
	if (e.touches) {
		posX = e.touches[0].clientX;
		posY = e.touches[0].clientY;
		touch = true;
	} else {
		posX = e.clientX;
		posY = e.clientY;
	}
	
	// move the zoom a little bit up on mobile
	zoom.style.top = `${posY - zoom.offsetHeight / 1.25}px`;
	zoom.style.left = `${posX - zoom.offsetWidth / 2}px`;
	
	let percX = (posX - this.offsetLeft) / this.offsetWidth,
			percY = (posY - this.offsetTop) / this.offsetHeight;
	
	let zoomLeft = -percX * zoomImage.offsetWidth + (zoom.offsetWidth / 2),
			zoomTop = -percY * zoomImage.offsetHeight + (zoom.offsetHeight / 2);
	
	zoomImage.style.left = `${zoomLeft}px`;
	zoomImage.style.top = `${zoomTop}px`;
}



image.addEventListener('mouseover', enterImage);
image.addEventListener('touchstart', enterImage);

image.addEventListener('mouseout', leaveImage);
image.addEventListener('touchend', leaveImage);

image.addEventListener('mousemove', move);
image.addEventListener('touchmove', move);


image.addEventListener('wheel', e => {
	e.preventDefault();
	e.deltaY > 0 ? zoomLevel-- : zoomLevel++;
	
	if (zoomLevel < 1) zoomLevel = 1;
	if (zoomLevel > 5) zoomLevel = 5;
	
	console.log(`zoom level: ${zoomLevel}`);
	zoom.style.transform = `scale(${zoomLevel})`;
});