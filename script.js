const container=document.querySelector('.container')
const seats=document.querySelectorAll('.row .seat:not(.occupied)')
const total=document.getElementById('total')
const count=document.getElementById('count')
const movieSelect=document.getElementById('movie')
 populateUI()

let ticketPrice=+movieSelect.value

console.log( typeof ticketPrice)
//Save selected movie index and price

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePRice', moviePrice)
}
//Update total and counts
function updateSelectedCounts(){
 const selectedSeat= document.querySelectorAll('.row .seat.selected')


 const seatIndex=[...selectedSeat].map((seat)=>{
     return [...seats].indexOf(seat)
 })
     localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))
 console.log(seatIndex)
 const selectedSeatsCount= selectedSeat.length

 count.innerText=selectedSeatsCount

 total.innerText=selectedSeatsCount*ticketPrice
}

//movie slect event

movieSelect.addEventListener('change', (e)=>{
    ticketPrice=+e.target.value

    setMovieData(e.target.seatIndex, e.target.value)
    updateSelectedCounts()
})

///Seats click eevnts
container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied')){
   e.target.classList.toggle('selected')

   updateSelectedCounts()
    }
})

//get data from local storage an popuplate ui

function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'))

    console.log(selectedSeats)

    if(selectedSeats !==null && selectedSeats.length>0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex= localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex !==null){
        movieSelect.selectedIndex=selectedMovieIndex
    }
}


//initial count and total

updateSelectedCounts()
//LOCAL STORAGE

//COPY SLECTED SEATS INTO AN ARRAY
