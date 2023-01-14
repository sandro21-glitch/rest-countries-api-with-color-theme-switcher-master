const darkMode = document.getElementById('darkMode')

darkMode.addEventListener("click", () => {
    const body = document.querySelector('body')
    body.classList.toggle('dark')
})

window.addEventListener('DOMContentLoaded', () => {
    countriesApi()
})

const countryList = document.getElementById('wrapper')
const searchInput = document.getElementById('searchInput')

async function countriesApi() {
        const res = await fetch('https://restcountries.com/v2/all');
        const countries = await res.json();
        // console.log(countries)
        displayAllCountry(countries)
}


function displayAllCountry(data) {
    data.forEach(country => {
        const countries = document.createElement('a')
        countries.classList.add('list-item')
        countries.innerHTML = 
        `
            <img src="${country.flags.png}" alt="${country.name}" />
            <div class="info">
            <h2 class="country-name">
            ${country.name}
            </h2>
            <div>
            <h3>Population:</h3>
            <span id="population" class="population">${country.population}</span>
            </div>
            <div>
            <h3>Region:</h3>
            <span id="region" class="region">${country.region}</span>
            </div>
            <div>
            <h3>Capital:</h3>
            <span id="Capital" class="capital">${country.capital}</span>
            </div>
            </div>
            `
            countries.addEventListener('click', () => {
                document.querySelector('.main').classList.add('hidden')
                document.querySelector('.info-content').classList.remove('hidden')
                showModalDetails(country)
            })
            countryList.appendChild(countries);
        })
}


function showModalDetails(country) {
    const countryName = document.querySelector('.country-name__info')
    const countryImg = document.querySelector('.country-info img')
    const nativeName = document.querySelector('.native-name')
    const domain = document.querySelector('.domain')
    const popInfo = document.querySelector('.population__info')
    const region = document.querySelector('.region__info')
    const languages = document.querySelector('.languages__info')
    const subRegion = document.querySelector('.sub-region')
    const capitalInfo = document.querySelector('.capital__info')
    const currencies = document.querySelector('.currencies')


    countryName.innerText = country.name
    countryImg.src = country.flags.png
    nativeName.innerText = country.nativeName
    domain.innerText = country.topLevelDomain
    popInfo.innerText = country.population
    region.innerText = country.region
    subRegion.innerText = country.subregion
    languages.innerText = country.languages.map(language => language.name)
    subRegion.innerText = country.subregion
    capitalInfo.innerText = country.capital
    currencies.innerText = country.currencies[0].code
}

const backBtn = document.getElementById('backBtn')
backBtn.addEventListener("click", () => {
    document.querySelector('.main').classList.remove('hidden')
    document.querySelector('.info-content').classList.add('hidden')
})

//Filter input
searchInput.addEventListener('input', function(e) {
    const { value } = e.target
    const countryNames = document.querySelectorAll('.country-name');
    
   countryNames.forEach(name => {
    if(name.innerText.toLowerCase().includes(value.toLowerCase())) {
        name.parentElement.parentElement.style.display = 'block'
    }else {
        name.parentElement.parentElement.style.display = 'none'
    }
   })
})

//Filter by region
const regionFilter = document.querySelectorAll('.select-list')
regionFilter.forEach(filter => {
    filter.addEventListener('change', (e) => {
        searchInput.value = null
        const { value } = e.target
        const regions = document.querySelectorAll('.region')
        // console.log(regions)
        // console.log(value)
        regions.forEach(region => {
            if(region.innerText.toLowerCase().includes(value.toLowerCase()) || value === 'All') {
                region.parentElement.parentElement.parentElement.style.display = 'block'
            }else {
                region.parentElement.parentElement.parentElement.style.display = 'none'
            }
        })
    })
})
