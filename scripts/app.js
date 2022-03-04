const cityForm = document.querySelector('form')
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUI = (data) => {
    
    console.log(data)
    const {cityDetails, weather} = data


    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather[0].WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather[0].Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
    `
    // update night/day & icon images
    const iconSrc = `img/icons/${weather[0].WeatherIcon}.svg`;
    console.log(iconSrc)
    icon.setAttribute('src', iconSrc)

    let timeSrc = weather[0].IsDayTime ? 'img/day.svg' : 'img/night.svg'
    
    time.setAttribute('src', timeSrc)
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}
const updateCity = async (city) => {
    const cityDetails = await getCity(city)
    const weather = await getWeather(cityDetails.Key);
    return {cityDetails,weather}
}
cityForm.addEventListener('submit', e => {
    e.preventDefault()
    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))
})