document.addEventListener("mousemove", function(event){

let x = event.clientX
let y = event.clientY

let moveX = (x / window.innerWidth) * 10
let moveY = (y / window.innerHeight) * 10

document.body.style.backgroundPosition =
`calc(50% + ${moveX}px) calc(50% + ${moveY}px)`

})