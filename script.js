
const loadPhone = async (inputText, isShow) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    const data = await response.json();
    const phones = data.data;
    displayPhones(phones, isShow);
}




const displayPhones = (phones, isShow) => {
    
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent= ``;

// Display only 1st 11 phone
    

    const showAll = document.getElementById('showAll');

    if(phones.length > 10 && !isShow ) {
        showAll.classList.remove('hidden');
    } else{
        showAll.classList.add('hidden');
    }

    if(!isShow) {
        phones = phones.slice(0, 10)
    }

    phones.forEach(function(phone) {
        // console.log(phones.length)
        const div = document.createElement('div');
        div.classList = `card card-compact max-w-96 bg-base-100 shadow-xl m-auto`;
        div.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
            </div>
        `;
       
        phoneContainer.appendChild(div);
        
    })
    loading(false);
}


const loading = (isLoading)=> {
    const loadingSpin = document.getElementById('loadingSpin');
    if(isLoading){
        loadingSpin.classList.remove('hidden');
    } else{
        loadingSpin.classList.add('hidden');
    }
}






const getSearch = (isShow, clear) => {

    const input = document.getElementById('inputBox');
    const inputText = input.value;
    if(clear) {
        input.value = clear
    };
    loadPhone(inputText, isShow);
    loading(true);
}



const showAllBtn = () => {
    getSearch(true, ' ');
    
}





const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    showPhoneDetails(data.data)
    
    
}

const showPhoneDetails= (phone) => {
    console.log(phone)
    const details = document.getElementById('details-container');
    details.innerHTML = `
        <img src="${phone.image}" alt="">
        <p class="text-xl font-bold">${phone.name}</p>
        <p class=""><strong>Released: </strong>${phone.releaseDate}</p>
        <ul>
            <li><strong>Chipset:</strong> ${phone.mainFeatures.chipSet}</li>
            <li><strong>Storage:</strong> ${phone.mainFeatures.storage}</li>
            <li><strong>Memory:</strong> ${phone.mainFeatures.memory}</li>
        </ul>
    
    `
    my_modal_5.showModal()
}