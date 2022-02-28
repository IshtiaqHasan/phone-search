const searchPhones = () => {
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    //console.log(searchText);
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    data.forEach(phone => {
        //console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="shadow bg-body rounded-3">
            <img src="${phone.image}" class="card-img-top w-50" alt="...">
            <div class="card-body">
                <h5 class="card-title">Brand: ${phone.brand}</h5>
                <h5 class="card-title">Model-Name: ${phone.phone_name}</h5>
                <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary btn-lg">Details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top w-25 mx-auto" alt="...">
        <div class="card-body mx-auto">
            <h5 class="card-title">Name: ${phone.name}</h5>
            <h5 class="card-title">
            Specification: 
            </h5>
            <h6 class="card-title">
            Chipset:  ${phone.mainFeatures.chipSet}
            </h6>
            <h6 class="card-title">
            Display Size:  ${phone.mainFeatures.displaySize}
            </h6>
            <h6 class="card-title">
            Memory:  ${phone.mainFeatures.memory}
            </h6>
            <h6 class="card-title">
            Storage:  ${phone.mainFeatures.storage}
            </h6>
            <h6 class="card-title">
            Sensors:  ${phone.mainFeatures.sensors}
            </h6>
            <p class="card-text">Realese Date: ${phone.releaseDate}</p>
        </div>
    
    
    `;
    phoneDetails.appendChild(div)
}