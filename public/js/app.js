const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')


weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    
    fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent = data.error
           
        }else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
    })
})
})
