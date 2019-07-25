//BROWSEHAPPY BROWSER NOTICE FUNCTION
function hidebrowsehappydiv() {
	document.getElementById('browsehappy-notice').style.display = 'none';
}

//jQuery Code
jQuery(document).ready(function ($) {

	if ($("video").prop('muted')) {
		$("a.audio-control").removeClass("muted-state");
		$("a.audio-control").addClass("unmuted-state");
		$("video").prop('muted', false);
	} else {
		$("a.audio-control").removeClass("unmuted-state");
		$("a.audio-control").addClass("muted-state");
		$("video").prop('muted', true);
	}

	$("a.audio-control").click(function () {
		if ($("video").prop('muted')) {
			$("a.audio-control").removeClass("muted-state");
			$("a.audio-control").addClass("unmuted-state");
			$("video").prop('muted', false);
		} else {
			$("a.audio-control").removeClass("unmuted-state");
			$("a.audio-control").addClass("muted-state");
			$("video").prop('muted', true);
		}
	});

	$('.testimonials-block .testimonial-box .text-box blockquote, .many-more-wrap h5').matchHeight({
		byRow: true
	});
	$('#faq .box h3').click(function () {
		$(this).parent().toggleClass('active');
		$(this).next().slideToggle();
	});
	$('#intro').css('padding-top', $('.fixed-header').height() + 20);
	$(window).resize(function (e) {
		$('#intro').css('padding-top', $('.fixed-header').height() + 20);
	});
	$('.scroller').click(function (e) {
		e.preventDefault();
		var target = $(this).attr('href');
		$('html,body').animate({
			scrollTop: $(target).offset().top - 99
		}, 1000);
	});

	//SUPPORT FUNCTION
	$('a.need-help-email').click(function (e) {
		e.preventDefault();
		$(this).closest('.need-help').children('.overlay-email').fadeIn();
	});
	$('a.need-help-phone').click(function (e) {
		e.preventDefault();
		$(this).closest('.need-help').children('.overlay-phone').fadeIn();
	});
	$('.need-help a.close').click(function (e) {
		e.preventDefault();
		$('.need-help .overlay').fadeOut();
	});
	//END SUPPORT FUNCTION
});
