let value
function getInput () {
  value = document.querySelector('input').value
  if (value > 100) {
    value = 100
  }

  let percent1 = value
  let percent2 = percent1 * 3.6
  let circle = document.getElementById('circle')
  circle.style = `background-image: conic-gradient(#d4e4bf 0deg, #d4e4bf ${percent2}deg, #a1ca91 ${percent2}deg);\n`
}