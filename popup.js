var switchersStates = {};

function copyToClipboard(str) {
	document.oncopy = function(event) {
		event.clipboardData.setData('text/plain', str);
		event.preventDefault();
	};
	document.execCommand('Copy', false, null);
}

function initOptionSwitcher(imgNode, domainOption, globalOption, srcValues) {
	switchersStates[domainOption] = domainOption in localStorage ? +localStorage[domainOption] : (localStorage[globalOption] ? 1 : 0);
	imgNode.src = srcValues[switchersStates[domainOption]];
	imgNode.onclick = function() {
		switchersStates[domainOption] = +!switchersStates[domainOption];
		localStorage[domainOption] = switchersStates[domainOption] ? 1 : '';
		imgNode.src = srcValues[switchersStates[domainOption]];
	};
}

document.addEventListener('DOMContentLoaded', function() {
	var errorsNode = document.getElementById('errors');
	var copyNode = document.getElementById('copy');
	var clearNode = document.getElementById('clear');
	var settings = document.getElementById('settings_pop');

	var iconNode = document.getElementById('showIcon');
	iconNode.title = 'Show error notification icon on ' + request.host;
	initOptionSwitcher(iconNode, 'icon_' + request.host, 'showIcon', [
		'img/disabled.png',
		'img/enabled.png'
	]);

	var popupNode = document.getElementById('showPopup');
	popupNode.title = 'Show popup with errors details on ' + request.host;
	initOptionSwitcher(popupNode, 'popup_' + request.host, 'showPopup', [
		'img/disabled.png',
		'img/enabled.png'
	]);

	if(!request.errors) {
		errorsNode.innerHTML = '<p style="padding: 20px">There are no errors on this page :)</p>';
		copyNode.remove();
		clearNode.remove();
	}
	else {


			let leo = request.errors;
			let test = new RegExp('<br/>','g');
			let mass = leo.replace(test,'').split(',').reverse().slice(1).reverse();


			 mass.forEach((item, i) => {
				errorsNode.innerHTML = `<p>${i+1} - ${item}</p>`;
			 });
			settings.style= 'display:none;';

		clearNode.onclick = function() {
			closePopup(isIFrame);
		};

		copyNode.onclick = function() {
			var isWindows = navigator.appVersion.indexOf('Windows') != -1;
			copyToClipboard(request.errors.replace(/<br\/>/g, isWindows ? '\r\n' : '\n').replace(/<.*?>/g, ''));
			closePopup();
		};
	}

	window.addEventListener('message', function(event) {
		if(typeof event.data == 'object' && event.data._reloadPopup) {
			request = parseUrl(event.data.url);

			let leo = request.errors;
			let test = new RegExp('<br/>','g');
			let mass = leo.replace(test,'').split(',').reverse().slice(1).reverse();


			 mass.forEach((item, i) => {
				  errorsNode.innerHTML = `<p>${i} - ${item}</p>`;
				  console.log(`${i+1} - ${item}`);
			 })

			console.log(mass.reverse().slice(1).reverse());




			setTimeout(autoSize, 100);
			setTimeout(autoSize, 500); // hot fix for slow CPU
		}
	});
});

