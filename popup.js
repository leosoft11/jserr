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

		

		let leo = request.errors;
		let test = new RegExp('<br/>', 'g');
		let mass = leo.replace(test, '').split(',').reverse().slice(1).reverse();

		let whitelist2 = [
			"Failed to load resource: the server responded with a status of 404 (Not Found)",
			"Uncaught TypeError: window.djpush is not a function",
			"'BLOCKED_BY_CLIENT', Uncaught SyntaxError: Unexpected token ')'",
			"ReferenceError: AjaxForm is not defined&nbsp;/blog/razrabotka-sajtov/11-oshibok-yuzabiliti-sozdaem-effektivnyie-sajtyi.html:22:108964",
			"File not found: https://mc.yandex.ru/watch/0?callback=_ymjsp999225549&amp;page-url=http%3A%2F%2F127.0.0.1%3A5500%2F&amp;nohit=1&amp;charset=utf-8&amp;browser-info=pv%3A1%3Agdpr%3A14%3Avf%3A2fhsb6k71knxmycx7%3Afu%3A1%3Aen%3Autf-8%3Ala%3Aen-US%3Av%3A581%3Acn%3A1%3Adp%3A0%3Als%3A1236787872498%3Ahid%3A899345601%3Az%3A240%3Ai%3A20210708154346%3Aet%3A1625744627%3Ac%3A1%3Arn%3A724648370%3Au%3A1624812722449119647%3Aw%3A1792x679%3As%3A1792x1120x30%3Ask%3A2%3Acpf%3A1%3Ans%3A1625744624948%3Are%3A1%3Awv%3A2%3Arqnl%3A1%3Ati%3A3%3Ast%3A1625744627%3At%3ADocument&amp;wmode=5"
		];


		mass = mass.filter(item => !whitelist2.includes(item));
		// mass.lenght === 0 ? errorsNode.innerHTML = `<p>${mass}</p>` : errorsNode.innerHTML = `<p>Вылезла ошибки из WL</p>`;
		errorsNode.innerHTML = `<p>${mass}</p>`;

		console.log(mass);
		
		setTimeout(() => {
			clearNode.click();
		}, 7000)

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
				"ReferenceError: AjaxForm is not defined&nbsp;/blog/razrabotka-sajtov/11-oshibok-yuzabiliti-sozdaem-effektivnyie-sajtyi.html:22:108964",
				"File not found: https://mc.yandex.ru/watch/0?callback=_ymjsp999225549&amp;page-url=http%3A%2F%2F127.0.0.1%3A5500%2F&amp;nohit=1&amp;charset=utf-8&amp;browser-info=pv%3A1%3Agdpr%3A14%3Avf%3A2fhsb6k71knxmycx7%3Afu%3A1%3Aen%3Autf-8%3Ala%3Aen-US%3Av%3A581%3Acn%3A1%3Adp%3A0%3Als%3A1236787872498%3Ahid%3A899345601%3Az%3A240%3Ai%3A20210708154346%3Aet%3A1625744627%3Ac%3A1%3Arn%3A724648370%3Au%3A1624812722449119647%3Aw%3A1792x679%3As%3A1792x1120x30%3Ask%3A2%3Acpf%3A1%3Ans%3A1625744624948%3Are%3A1%3Awv%3A2%3Arqnl%3A1%3Ati%3A3%3Ast%3A1625744627%3At%3ADocument&amp;wmode=5"
			]


			mass = mass.filter(item => !whitelist2.includes(item));
			// mass.lenght === 0 ? errorsNode.innerHTML = `<p>${mass}</p>` : errorsNode.innerHTML = `<p>Вылезла ошибка из WL</p>`;
			errorsNode.innerHTML = `<p>${mass}</p>`;
			console.log(mass);

			setTimeout(autoSize, 100);
			setTimeout(autoSize, 500); // hot fix for slow CPU
		}
	});
});

