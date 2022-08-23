window.onload = function () {

	AOS.init({
		once: true,
		duration: 2000,
	});


	// Слайдер вина
	if ($('.item-slider').length != 0) {
		let items = $('.item-slider .item'),
			check = 0,
			delay = 5000,
			delay2 = 750,
			i = 0;
		if (i == 0 && check == 0) {
			check += 1;
			$(items[i]).addClass('active');
		}
		let si = swap(items, i);
		for (let n = 0; n < items.length; n++) {
			$(items[n]).hover(
				function () {
					clearInterval(si);
				}, function () {
					si = swap(items, n)
				}
			);
		}

		function swap(items, i) {
			let si = setInterval(function () {
				$(items[i]).animate({ opacity: 0 }, delay2);
				setTimeout(function () {
					if (i != items.length - 1) {
						$(items[i]).removeClass('active');
						$(items[i + 1]).addClass('active').css({ 'opacity': '' });
						i += 1
					} else {
						$(items[i]).removeClass('active');
						$(items[0]).addClass('active').css({ 'opacity': '' });
						i = 0;
					}
				}, delay2);
				check += 1
			}, delay);
			return si;
		}

	}
	// Замена текста в новостях на главной
	if ($('.news').length != 0) {
		$('.news-item').each(function (index, item) {
			let date = $(item).find('.date'),
				title = $(item).find('.bottom .name a');

			dateMass = date.text().split(' ');
			if (dateMass[1].length >= 4) {
				date.html(dateMass[0] + ' ' + dateMass[1].substring(0, 3) + '.')
			}
			if (title.text().length > 40) {
				title.html(title.text().replace(/\s+/g, ' ').substring(0, 35) + '...')
			}
		});
	}
	$('.fancybox__button--fullscreen').click(() => {
		console.log('1');
		$(this).toggleClass('active');
	})
};

// Попап по таймеру
function PopupTimer(flag) {
	if (flag != 1) {
		let popup = $('#check-age'),
			delay2Open = 100,
			delayOpen = 1000;
		blackout = $('.blackout-background');
		setTimeout(function () {
			blackout.addClass('active').animate({ opacity: 1 }, delay2Open);
		}, 3000);
		setTimeout(function () {
			popup.addClass('active').animate({ opacity: 1 }, delayOpen);
		}, 3300);
	}
}
function ClosePopupTimer(id) {
	let popup = $('#' + id),
		delayClose = 200;
	blackout = $('.blackout-background');
	blackout.animate({ opacity: 0 }, delayClose);
	popup.animate({ opacity: 0 }, delayClose);
	setTimeout(function () {
		popup.removeClass('active');
		blackout.removeClass('active');
	}, delayClose);
}

// Попап по ссылке
function OpenPopup(id) {
	let popup = $('#' + id),
		delay2Open = 100,
		delayOpen = 1000;
	blackout = $('.blackout-background');
	blackout.addClass('active').attr('data-popup', id).animate({ opacity: 1 }, delay2Open);

	setTimeout(function () {
		popup.addClass('active').animate({ opacity: 1 }, delayOpen);
	}, 300);
}
function ClosePopup(id) {
	let popup = $('#' + id),
		delayClose = 200;
	blackout = $('.blackout-background');
	blackout.animate({ opacity: 0 }, delayClose).attr('data-popup', '');
	popup.animate({ opacity: 0 }, delayClose);
	setTimeout(function () {
		popup.removeClass('active');
		blackout.removeClass('active');
	}, delayClose);
}

// Попап логина
const signUpButton = $('#signUp'),
	signInButton = $('#signIn'),
	container = $('#login');

signUpButton.click(() => {
	container.addClass("right-panel-active");
});

signInButton.click(() => {
	container.removeClass("right-panel-active");
});

// fancybox


Fancybox.bind('[data-fancybox="gallery"]', {
	Toolbar: {
		autoEnable: false,
		display: [
			{ id: "fullscreen", position: "left" },
			"close",
		],
	},
});


const searchBtn = document.querySelector('.js-search')
const searchBtnInput = document.querySelector('.search-input')
const searchBtnCross = document.querySelector('.js-cross')
searchBtn.addEventListener('click', ()=> {
	searchBtnInput.classList.add('ON6A2O')
	searchBtnCross.classList.add('active')

	console.log('loh')
})

searchBtnCross.addEventListener('click', ()=> {
	searchBtnInput.classList.remove('ON6A2O')
		searchBtnCross.classList.remove('active')
		console.log('this')
	console.log('this2')

})