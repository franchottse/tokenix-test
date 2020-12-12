import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import usePress from './usePress';

export default function App() {
	const [longPressCount, setlongPressCount] = useState(0);
	const [clickCount, setClickCount] = useState(0);
	const [morseCode, setMorseCode] = useState('');
	const [pressedEnter, setPressedEnter] = useState(false);
	const timeout = useRef();

	const onLongPress = () => {
		console.log('longpress is triggered');
		setlongPressCount((preLongPressCount) => preLongPressCount + 1);
		setMorseCode((preMorseCode) => preMorseCode + '-');
	};

	const onClick = () => {
		console.log('click is triggered');
		setClickCount((preClickCount) => preClickCount + 1);
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
				timeout.current = setTimeout(() => {
					setPressedEnter(false);
				}, 2500);
				break;
			case 'KeyS':
				console.log('You pressed Key S!');
				setMorseCode((preMorseCode) => preMorseCode + ' ');
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
				console.log('You released Key S!');
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
			<p>
				Please press <strong>Space</strong> or{' '}
				<strong>Left Click</strong> to input a morse code, Dash (-) for
				pressing more than 1.5 sec, Dot (.) otherwise, and press key{' '}
				<strong>S</strong> to add whitespace, you can also press
				Backspace to remove last character.
			</p>
			<span>Long press count: {longPressCount}</span>
			<span>Click count: {clickCount}</span>
			<span>Morse Code: {morseCode}</span>
			<br />
			<br />
			<div
				className={`alert alert-success ${
					pressedEnter ? 'alert-shown' : 'alert-hidden'
				}`}
				style={{
					margin: '0px',
					marginBottom: '0rem 0px',
					padding: '0px',
					border: '0px',
				}}
			>
				<Alert
					variant="success"
					style={{
						fontWeight: 'bold',
						fontSize: '38px',
					}}
				>
					Message Sent: HELP ME!
				</Alert>
			</div>
		</div>
	);
}
