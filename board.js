let board_state = {
	'A1':0,
	'A2':0,
	'A3':0,
	'B1':0,
	'B2':0,
	'B3':0,
	'C1':0,
	'C2':0,
	'C3':0
}

// global variables
let turn_number = 1;
let status = document.getElementById('status');

// give square an onclick function
let squares = document.getElementsByClassName('square');
for(s = 0; s < squares.length; s++) {
	squares[s].setAttribute('onclick', 'place(this)');
	console.log("I just clicked");
};

// places x's and o's on board
function place(me) {
	// prevent placing x's or o's on same squares
	if (me.children.length != 0) {
		return;
	};

	let player = turn();

	// x's or o'x base on player
	let value = {
		'one':'X',
		'two':'O'
	};

	// create div containing x's or o's inside squares
	let xo =  document.createElement('div');
	xo.innerHTML = value[player];

	value[player] == 'X' ? xo.setAttribute('class', 'play x'):xo.setAttribute('class', 'play o');

	me.appendChild(xo);

	// check if a player won the game
	updateBoard(me.id);

	if (iswinner() == 'Player One Wins') {
		status.innerHTML = 'Player One Wins';
		status.setAttribute('class', 'statusred');
		setTimeout(reset, 1000);
	} else if (iswinner() == 'Player Two Wins') {
		status.innerHTML = 'Player Two Wins';
		status.setAttribute('class', 'statusblue');
		setTimeout(reset, 1000);
	} else if (iswinner() == 'Tie Game') {
		set.innerHTML = 'Tie Game';
		setTimeout(reset, 1000);
	};

	// pass turn
	turn_number ++;
};

function turn() {
	return (turn_number % 2 == 0) ? 'two':'one';
};

function reset() {
	status.innerHTML = '';

	for (r = 0; r < sqaure.length; r ++) {
		squares[r].innerHTML = '';
	};

	for (var key in board_state) {
		board_state[key] = 0;
	};

	turn_number = 1;
};

function updateBoard (location) {
	let value = 0;
	turn() == 'one' ? value = 5:value = 1;

	board_state[location] = value;
};

function iswinner() {
	// convert object to array to analyze
	let temp = Object.values(board_state);

	// create empty array for 3x3
	let board_state_array = [];

	// slice object array into 3x3
	for (x = 0; x + 3 <= temp.length; x += 3) {
		board_state_array.push(temp.slice(x, x + 3));
	};

	console.log(board_state_array);
};

iswinner();




