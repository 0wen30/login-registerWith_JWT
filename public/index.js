window.onload = () => {

  document.querySelector('#btn1').addEventListener('click', (e) => {
    document.querySelector('#login').style.display = "block"
    document.querySelector('#registro').style.display = "none"
    e.target.style.background = '#89b'
    document.querySelector('#btn2').style.background = '#b75'
  })

  document.querySelector('#btn2').addEventListener('click', (e) => {
    document.querySelector('#registro').style.display = "block"
    document.querySelector('#login').style.display = "none"
    e.target.style.background = '#89b'
    document.querySelector('#btn1').style.background = '#b75'
  })

}