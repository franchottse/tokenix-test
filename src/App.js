import React, { useState, useEffect } from 'react';
import './styles.css';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import usePress from './usePress';

export default function App() {
	const [morseCode, setMorseCode] = useState('');
	const [pressedEnter, setPressedEnter] = useState(false);
	const [message, setMessage] = useState('');
	const alphabet = {
		'-----': '0',
		'.----': '1',
		'..---': '2',
		'...--': '3',
		'....-': '4',
		'.....': '5',
		'-....': '6',
		'--...': '7',
		'---..': '8',
		'----.': '9',
		'.-': 'A',
		'-...': 'B',
		'-.-.': 'C',
		'-..': 'D',
		'.': 'E',
		'..-.': 'F',
		'--.': 'G',
		'....': 'H',
		'..': 'I',
		'.---': 'J',
		'-.-': 'K',
		'.-..': 'L',
		'--': 'M',
		'-.': 'N',
		'---': 'O',
		'.--.': 'P',
		'--.-': 'Q',
		'.-.': 'R',
		'...': 'S',
		'-': 'T',
		'..-': 'U',
		'...-': 'V',
		'.--': 'W',
		'-..-': 'X',
		'-.--': 'Y',
		'--..': 'Z',
		'/': ' ',
		'-.-.--': '!',
		'.-.-.-': '.',
		'--..--': ',',
	};

	const decodeMorseCode = () => {
		if (morseCode === '') {
			setMessage('(Empty message)');
			return;
		}

		console.log(`morseCode: ${morseCode}`);

		setMorseCode('');

		let messageConverted = [];

		morseCode.split('//').forEach((word) => {
			word.split('/').forEach((letter) => {
				if (letter in alphabet) messageConverted.push(alphabet[letter]);
				else messageConverted.push('■');
			});
			messageConverted.push(' ');
		});

		console.log(`decode result: ${messageConverted.join('')}`);
		setMessage(messageConverted.join(''));
	};

	const onLongPress = () => {
		console.log('longpress is triggered');
		setMorseCode((preMorseCode) => preMorseCode + '-');
	};

	const onClick = () => {
		console.log('click is triggered');
		setMorseCode((preMorseCode) => preMorseCode + '.');
	};

	const defaultOptions = {
		shouldPreventDefault: true,
		delay: 1500,
	};

	const handleKeydown = (e) => {
		if (e.repeat) return;
		switch (e.code) {
			case 'Enter':
				console.log('You pressed Enter!');
				setPressedEnter(true);
				setTimeout(() => {
					setPressedEnter(false);
				}, 2500);
				decodeMorseCode();
				break;
			case 'KeyS':
			case 'Slash':
				console.log('You pressed Key S or Slash!');
				setMorseCode((preMorseCode) => preMorseCode + '/');
				break;
			case 'Backspace':
				console.log('You pressed Backspace!');
				setMorseCode((preMorseCode) =>
					preMorseCode.substring(0, preMorseCode.length - 1)
				);
				break;
			default:
				console.log('You pressed other key!');
		}
	};

	const handleKeyup = (e) => {
		switch (e.code) {
			case 'Enter':
				console.log('You released Enter!');
				break;
			case 'KeyS':
			case 'Slash':
				console.log('You released Key S or Slash!');
				break;
			case 'Backspace':
				console.log('You pressed Backspace!');
				break;
			default:
				console.log('You released other key!');
		}
	};

	const longPressEvent = usePress(onLongPress, onClick, defaultOptions);

	useEffect(() => {
		window.onmousedown = longPressEvent.onMouseDown;
		window.onmouseup = longPressEvent.onMouseUp;
		window.onmouseleave = longPressEvent.onMouseLeave;
		window.onkeydown = longPressEvent.onTouchStart;
		window.onkeyup = longPressEvent.onTouchEnd;

		window.addEventListener('keydown', handleKeydown);
		window.addEventListener('keyup', handleKeyup);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('keyup', handleKeyup);
		};
	}, [longPressEvent]);

	return (
		<div className="App">
			<h1>Morse Code Interpreter</h1>
			<br />
			<p>
				Please press <strong>Space</strong> or{' '}
				<strong>Left Click</strong> to input a morse code,{' '}
				<strong>Dash (-)</strong> for pressing more than 1.5 sec,{' '}
				<strong>Dot (.)</strong> otherwise, and press key{' '}
				<strong>S</strong> to add whitespace indicated by{' '}
				<strong>Slash (/)</strong> (one space for separating characters,
				three spaces for separating words), you can also press Backspace
				to remove last character.
			</p>
			<br />
			<p>
				Note: If your input code does not exist in morse code, the
				result will show <strong>Square (&#9632;)</strong>
			</p>
			<span>Morse Code: {morseCode}</span>
			<br />
			<br />
			<div
				className={`alert alert-success ${
					pressedEnter ? 'alert-shown' : 'alert-hidden'
				}`}
			>
				<Alert
					variant="success"
					style={{
						fontWeight: 'bold',
						fontSize: '38px',
					}}
				>
					Message Sent: {message}
				</Alert>
			</div>
		</div>
	);
}
