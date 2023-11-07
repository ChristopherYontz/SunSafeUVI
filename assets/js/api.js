const getLocation = () => {
    const successCallback = position => {
        const currentDate = new Date().toISOString()
        const lat = position.coords.latitude
        const long = position.coords.longitude

        const myHeaders = new Headers();
            myHeaders.append("x-access-token", "openuv-31cr8rllpsplmg-io");
            myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${long}&alt=100&dt=${currentDate}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.uviResult').innerText = `${data.result.uv}`
            })
            .catch(error => document.querySelector('.uviResult').innerText = 'is currently unavailable.');

    }
    const errorCallback = error => console.log(error)

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
} 

document.addEventListener('DOMContentLoaded', getLocation)
