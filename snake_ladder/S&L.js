let tog = 1;
let rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
let winSound = new Audio('winharpsichord-39642.mp3');

let p1sum = 0;
let p2sum = 0;

// Define ladders and snakes
const ladders = {
    7: 65,
    19: 43,
    28: 50,
    54: 91,
    76: 97
};

const snakes = {
    25: 3,
    63: 41,
    67: 30,
    92: 66,
    98: 8
};

function play(player, psumKey, correction, num) {
    let sum;

    if (psumKey === 'p1sum') {
        p1sum += num;
        if (p1sum > 100) p1sum -= num;

        if (ladders[p1sum]) p1sum = ladders[p1sum];
        if (snakes[p1sum]) p1sum = snakes[p1sum];

        sum = p1sum;
    }

    if (psumKey === 'p2sum') {
        p2sum += num;
        if (p2sum > 100) p2sum -= num;

        if (ladders[p2sum]) p2sum = ladders[p2sum];
        if (snakes[p2sum]) p2sum = snakes[p2sum];

        sum = p2sum;
    }

    const piece = document.getElementById(`${player}`);
    piece.style.transition = `all 0.5s linear`;

    if (sum < 10) {
        piece.style.left = `${(sum - 1) * 62}px`;
        piece.style.top = `${-0 * 62 - correction}px`;
    } else if (sum === 100) {
        winSound.play();
        setTimeout(() => {
            alert(player === 'p1' ? "Red Won !!" : "Yellow Won !!");
            location.reload();
        }, 500);
    } else {
        let digits = String(sum).split('').map(Number);
        let n1 = digits.length === 2 ? digits[0] : 10;
        let n2 = digits.length === 2 ? digits[1] : 0;

        if (n1 % 2 !== 0) {
            // Odd rows (right to left)
            if (n2 === 0) {
                piece.style.left = `${9 * 62}px`;
                piece.style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                piece.style.left = `${(9 - (n2 - 1)) * 62}px`;
                piece.style.top = `${-n1 * 62 - correction}px`;
            }
        } else {
            // Even rows (left to right)
            if (n2 === 0) {
                piece.style.left = `0px`;
                piece.style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                piece.style.left = `${(n2 - 1) * 62}px`;
                piece.style.top = `${-n1 * 62 - correction}px`;
            }
        }
    }
}

document.getElementById("diceBtn").addEventListener("click", function () {
    rollingSound.play();
    let num = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerText = num;

    if (tog % 2 !== 0) {
        document.getElementById('tog').innerText = "Yellow's Turn : ";
        play('p1', 'p1sum', 0, num); // Red
    } else {
        document.getElementById('tog').innerText = "Red's Turn : ";
        play('p2', 'p2sum', 55, num); // Yellow
    }

    tog++;
});
