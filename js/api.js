const searchPhones = () => {
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    //console.log(searchText);
    searchField.value = '';
    if (searchText == '') {
        document.getElementById("phoneSearch-error").style.display = "block";
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
        document.getElementById("phoneSearch-error").style.display = '';
    }

}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (data == 0) {
        document.getElementById('phoneNot-found').style.display = 'block';
    }
    else {
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
            document.getElementById('phoneNot-found').style.display = '';
        })
    }

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
    div.classList.add('col');
    div.innerHTML = `
        <div id="phone-details" class="shadow bg-body rounded-3">
           <img src="${phone.image}" class="card-img-top w-25" alt="...">
           <div class="card-body ps-5">
                <h5 class="card-title">Name: ${phone.name}</h5>
                <h5 class="card-title">Brand: ${phone.brand}</h5>
                <h5 class="card-title">
                Specification: 
                </h5>
                <h6 class="card-title">
                Chipset-  ${phone.mainFeatures.chipSet}
                </h6>
                <h6 class="card-title">
                Display Size-  ${phone.mainFeatures.displaySize}
                </h6>
                <h6 class="card-title">
                Memory-  ${phone.mainFeatures.memory}
                </h6>
                <h6 class="card-title">
                Storage-  ${phone.mainFeatures.storage}
                </h6>
                <h6 class="card-title">
                Sensors-  ${phone.mainFeatures.sensors}
                </h6>
                <h5 class="card-text">Realese Date: ${phone.releaseDate}</h5>
           </div>
        </div>
        
    
    `;
    phoneDetails.appendChild(div)
}