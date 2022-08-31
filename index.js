// step-1 fetch data from api using loadphones() function and display it on displayPhones() function
const loadPhones = async (search,dataLimit) => {
   const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data,dataLimit)
}


const  displayPhones = (phones, limit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML = ''

    // warning for no phone on list
  const noPhone =  document.getElementById('no-phone')
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    }
    // showing only 5 phones
    const showAllBtn = document.getElementById('show-all-btn')
    if( phones.length  > 6 && limit) {
       phones = phones.slice(0,6)
       showAllBtn.classList.remove('d-none')
    } 
    else if(!limit){
        phones = phones
        showAllBtn.classList.add('d-none')
    }
  

    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
                 <div class="card p-5">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "getPhoneId('${(phone.slug)}')" class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                  </div>`
        phoneContainer.appendChild(div)
    })
    loadSpinner(false)

}

// show all phone by clicking show all button
// const showAllPhone = limit => {
    
// }

// step 2 create searchbox and find phone by clicking button
document.getElementById('search-btn').addEventListener('click',function(){
    loadSpinner(true)
    const getInputValueSearch = document.getElementById('search-field').value 
    getInputValueSearch.value = ''
    loadPhones(getInputValueSearch, true)
    
})

// show all phone button by clicking show all
document.getElementById('show-all-btn').addEventListener('click',function(){
    const getInputValueSearch = document.getElementById('search-field').value 
    loadPhones(getInputValueSearch)
})


// Find search result when press enter
document.getElementById('search-field').addEventListener('keyup', function (e) {
    // loadSpinner(true)
    if (e.key === 'Enter') {
     const getInputValueSearch = document.getElementById('search-field').value 
     getInputValueSearch.value = ''
    loadPhones(getInputValueSearch,true)
    }
});

// spinner section 
const loadSpinner = isSpinner =>{
    const spinnerId = document.getElementById('spinner')
    if(isSpinner === true){
        spinnerId.classList.remove('d-none')
    } else {
        spinnerId.classList.add('d-none')
    }
}
// loadPhones('a')

// creating indvi link for phone

const getPhoneId = async (phoneId) => {
    // console.log(phoneId)
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    const res =  await fetch(url)
    const data = await res.json()
    displayPhoneId(data.data)
}
const displayPhoneId = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('exampleModalLabel')
    modalTitle.innerText = `${phone.name} `
    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
    <h5>${phone.brand}</h5>
    <img src="${phone.image}" alt="">`
}
