import './scss/base.scss';
import axialslider from './utils/axialslider';

let menu_is_open = false;

if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	} )();
}

window.slideDown = function (event) {
    const scroll_start = document.documentElement.scrollTop;
    let time_start = performance.now();
    let delta = document.querySelector('.header').offsetHeight - scroll_start;
    window.requestAnimationFrame(function animate (time) {
        let time_fraction = (time - time_start) / 500;
        if (time_fraction > 1) time_fraction = 1;
        
        document.documentElement.scrollTo(0, scroll_start + delta * time_fraction);
        if (time_fraction < 1) {
            window.requestAnimationFrame(animate);
        }
    });
};

window.openMenu = function (event) {
    event.preventDefault();
    if (menu_is_open) {
        document.querySelector('.header__popup').style.backgroundColor = 'rgba(255,255,255,0)';
        setTimeout(() => {
            document.querySelector('.header__popup').classList.remove('header__popup_active');
        }, 300);
    } else {
        document.querySelector('.header__popup').classList.add('header__popup_active');
        setTimeout(() => {
            document.querySelector('.header__popup').style.backgroundColor = 'rgba(255,255,255,1)';
        }, 0);
    }
    menu_is_open = !menu_is_open;
};

window.addEventListener('load', function () {
    axialslider();
});