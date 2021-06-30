var switchersStates = {};

function copyToClipboard(str) {
	document.oncopy = function (event) {
		event.clipboardData.setData('text/plain', str);
		event.preventDefault();
	};
	document.execCommand('Copy', false, null);
}

function initOptionSwitcher(imgNode, domainOption, globalOption, srcValues) {
	switchersStates[domainOption] = domainOption in localStorage ? +localStorage[domainOption] : (localStorage[globalOption] ? 1 : 0);
	imgNode.src = srcValues[switchersStates[domainOption]];
	imgNode.onclick = function () {
		switchersStates[domainOption] = +!switchersStates[domainOption];
		localStorage[domainOption] = switchersStates[domainOption] ? 1 : '';
		imgNode.src = srcValues[switchersStates[domainOption]];
	};
}

document.addEventListener('DOMContentLoaded', function () {
	var errorsNode = document.getElementById('errors');
	var copyNode = document.getElementById('copy');
	var clearNode = document.getElementById('clear');
	var settings = document.getElementById('settings_pop');

	errorsNode.addEventListener('click', () => {

	})

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

	// const whitelist = [
	// 	{
	// 		"id": "1",
	// 		"errors": {
	// 			"name": 'Failed to load resource: the server responded with a status of 404 (Not Found)',
	// 		}
	// 	},
	// 	{
	// 		"id": "2",
	// 		"errors": {
	// 			"name": 'Uncaught TypeError: window.djpush is not a function',
	// 		}
	// 	},
	// 	{
	// 		"id": "3",
	// 		"errors": {
	// 			"name": 'BLOCKED_BY_CLIENT',
	// 		}
	// 	},
	// 	{
	// 		"id": "4",
	// 		"errors": {
	// 			"name": "Uncaught SyntaxError: Unexpected token ')'"
	// 		}
	// 	}
	// ]






	if (!request.errors) {
		errorsNode.innerHTML = '<p style="padding: 20px">There are no errors on this page :)</p>';
		copyNode.remove();
		clearNode.remove();
	}
	else {

		let whitelist2 = [
			"Failed to load resource: the server responded with a status of 404 (Not Found)",
			"Uncaught TypeError: window.djpush is not a function",
			"'BLOCKED_BY_CLIENT', Uncaught SyntaxError: Unexpected token ')'",
			"ReferenceError: AjaxForm is not defined&nbsp;/blog/razrabotka-sajtov/11-oshibok-yuzabiliti-sozdaem-effektivnyie-sajtyi.html:22:108964"
		]

		let leo = request.errors;
		let test = new RegExp('<br/>', 'g');
		let mass = leo.replace(test, '').split(',').reverse().slice(1).reverse();



		// mass.forEach((item, i) => {
		// 	errorsNode.innerHTML = `<p>${i + 1} - ${item}</p>`;
		// });


		mass = mass.filter(item => !whitelist2.includes(item));
		mass.lenght === 0 ? errorsNode.innerHTML = `<p>${mass}</p>` : errorsNode.innerHTML = `<p>Ой тут пусто</p>`;

		console.log(mass);
		setTimeout(() => {
			clearNode.click();
		}, 7000)

		// whitelist.forEach(item => {
		// 	const removeItemInce = (arr) => {
		// 		const index = arr.indexOf(item.errors.name);
		// 		if (index > -1) {
		// 			arr.splice(index, 1);
		// 			errorsNode.innerHTML = `<p>${arr}</p>`;
		// 		} else {
		// 			errorsNode.innerHTML = `<p>С этим живем :)</p>`;
		// 		}
		// 	};
		// 	removeItemInce(mass);
		// });
		settings.style = 'display:none;';

		clearNode.onclick = function () {
			closePopup(isIFrame);
		};

		copyNode.onclick = function () {
			var isWindows = navigator.appVersion.indexOf('Windows') != -1;
			copyToClipboard(request.errors.replace(/<br\/>/g, isWindows ? '\r\n' : '\n').replace(/<.*?>/g, ''));
			closePopup();
		};
	}

	window.addEventListener('message', function (event) {
		if (typeof event.data == 'object' && event.data._reloadPopup) {
			request = parseUrl(event.data.url);

			let leo = request.errors;
			let test = new RegExp('<br/>', 'g');
			let mass = leo.replace(test, '').split(',').reverse().slice(1).reverse();

			let whitelist2 = [
				"Failed to load resource: the server responded with a status of 404 (Not Found)",
				"Uncaught TypeError: window.djpush is not a function",
				"'BLOCKED_BY_CLIENT', Uncaught SyntaxError: Unexpected token ')'",
				"ReferenceError: AjaxForm is not defined&nbsp;/blog/razrabotka-sajtov/11-oshibok-yuzabiliti-sozdaem-effektivnyie-sajtyi.html:22:108964"
			]


			mass = mass.filter(item => !whitelist2.includes(item));
			mass.lenght === 0 ? errorsNode.innerHTML = `<p>${mass}</p>` : errorsNode.innerHTML = `<p>Ой тут пусто</p>`;


			// mass.forEach((item, i) => {
			// 	errorsNode.innerHTML = `<p>${i} - ${item}</p>`;
			// 	console.log(`${i + 1} - ${item}`);
			// })

			// whitelist.forEach(item => {
			// 	const removeItemInce = (arr) => {
			// 		const index = arr.indexOf(item.errors.name);
			// 		if (index > -1) {
			// 			arr.splice(index, 1);
			// 			errorsNode.innerHTML = `<p>${arr}</p>`;
			// 		} else {
			// 			errorsNode.innerHTML = `<p> С этим живем :)</p>`;
			// 			clearNode.click();
			// 		}
			// 	};
			// 	removeItemInce(mass);
			// });

			console.log(mass.reverse().slice(1).reverse());





			setTimeout(autoSize, 100);
			setTimeout(autoSize, 500); // hot fix for slow CPU
		}
	});
});

