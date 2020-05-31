const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value.split(',')[0];
const book = document.getElementById('button');

// Populate UI
clearUI()
populateUI()


function clearUI() {
    seats.forEach( function (seat) {
        if(seat.className == 'seat occupied'){
            seat.className = 'seat';
        }
    })
}

function populateUI() {
    const movieName = movieSelect.value.split(',')[1];
    const movieSeats = JSON.parse(localStorage.getItem(movieName));
    
    // Populate:
    if(movieSeats != null && movieSeats.length > 0) {
        seats.forEach( function (seat, index) {
            if(movieSeats.indexOf(index) > -1) {
                seat.classList.add('occupied');
            };
        });
    }
}

// Store the seats:
function saveSeats() {

    const confirmSeats = document.querySelectorAll('.row .seat.occupied');

    // Spread Operator -> Copies the values
    const seatsIndex = [...confirmSeats].map(function (seat) {
        return [...seats].indexOf(seat)
    });

    // Save in Local Storage:
    localStorage.setItem(movieSelect.value.split(',')[1], JSON.stringify(seatsIndex));
}


function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie Select Event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value.split(',')[0];
    // console.log(e.target.value.split(',')[1]);
    updateSelectedCount();
    clearUI();
    populateUI();
});

container.addEventListener('click', (e) => {
    const element = e.target;
    if(element.className == 'seat'){
        element.className += ' selected';
    }
    else if (element.className == 'seat selected') {
        element.className = 'seat'
    }
    updateSelectedCount();
});

book.addEventListener('click', function (e) {
    let sea = document.querySelectorAll('.seat');
    let start = true;
    sea.forEach( function(seat) {
        if(seat.className == "seat selected" & start==false) {
            seat.className = "seat occupied";
        }
        else if(seat.className == "seat selected") {
            start = false;
        }
    });
    saveSeats();
});

