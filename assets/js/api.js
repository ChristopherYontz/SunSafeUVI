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
                const lowMsg = 'You can safely enjoy being outside. Wear sunglasses on bright days. Use screen SPF30 or higher, and reapply at least every 2 hours. If you burn easily, make sure to cover up.'
                const moderateMsg = "Take precautions if you will be outside, such as wearing a hat and sunglasses and using sunscreen SPF 30+. Reduce your exposure to the sun's most intense UV radiation by seeking shade during midday hours."
                const highMsg = "Protection against sun damage is needed. Wear a wide-brimmed hat and sunglasses, use sunscreen SPF 30+ and wear a long-sleeved shirt and pants when practical. Reapply sunscreen at least every 2 hours. Reduce your exposure to the sun's most intense UV radiation by seeking shade during midday hours."
                const veryHighMsg = "Protection against sun damage is required. If you need to be outside during midday hours between 10 a.m. and 4 p.m., take steps to reduce sun exposure. A shirt, hat and sunscreen with SPF 30+ are a must, and be sure you seek shade. Reapply sunscreen at least every 2 hours. Beachgoers should know that white sand and other bright surfaces reflect UV and can double UV exposure. "
                const extremeMsg = "Protection against sun damage is absolutely required. If you need to be outside during midday hours between 10 a.m. and 4 p.m., take steps to reduce sun exposure. A shirt, hat and sunscreen with SPF30+ are a must, and be sure you seek shade. Reapply sunscreen at least every 2 hours. Beachgoers should know that white sand and other bright surfaces reflect UV and can double UV exposure. "

                document.querySelector('.uviResult').innerText = `${data.result.uv}`
                Number(data.result.uv) <= 3 ? document.querySelector('.uviMessage').innerText = `${lowMsg}` :
                Number(data.result.uv) <= 6 ? document.querySelector('.uviMessage').innerText = `${moderateMsg}` :
                Number(data.result.uv) <= 8 ? document.querySelector('.uviMessage').innerText = `${highMsg}` :
                Number(data.result.uv) <= 11 ? document.querySelector('.uviMessage').innerText = `${veryHighMsg}` :
                document.querySelector('.uviMessage').innerText = `${extremeMsg}`
                
            })
            .catch(error => document.querySelector('.uviResult').innerText = 'is currently unavailable.');

    }
    const errorCallback = error => document.querySelector('.uviResult').innerText = 'is currently unavailable.'

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
} 

document.addEventListener('DOMContentLoaded', getLocation)
