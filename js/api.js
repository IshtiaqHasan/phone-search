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
                <button type="button" class="btn btn-primary btn-lg">Details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}