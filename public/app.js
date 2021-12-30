// Personal API Key for OpenWeatherMap API
const apiKey = '6a1d1baceecb239f237a8fc5bf8f7bd5';
const weatherApiEndPoint = 'https://api.openweathermap.org/data/2.5/weather';
const endPointUrl = "http://localhost:3001";


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', onGenerateClicked);
/* Function called by event listener */
function onGenerateClicked() {
    onSendingData();
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getCurrentWeatherByZip(zip).then(data => {
        const requestBody = { ...data, feelings ,zip};
        sendData(`${endPointUrl}/save`, requestBody).then(savedData => {
            onDataSended();
            console.log("Data sended successfully");
            updateWeatherInfoUI(savedData.temp,savedData.feel,savedData.date);
        });
    })
}

/* Function to GET Web API Data*/
function getCurrentWeatherByZip(zip) {
    return new Promise((resolve, error) => {
        fetch(`${weatherApiEndPoint}?q=Egypt&appid=${apiKey}&zip=${zip}&units=imperial`)
            .then(res => {
                res.json().then(data => {
                    resolve(data);
                })

            })
    })

}
/* Function to POST data */
const  sendData = async (url, body)=>{
    const request =  await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return await request.json();
}

/* Function to GET Project Data */
const retrieveData = async () => {
    try {
        const request = await fetch('/all');
        const allData = await request.json();
        return allData;
    } catch (error) {
        console.log("error", error);
    }
}

const isDefined = (obj) => {
    return obj !== null && obj !== undefined;
}

const  updateWeatherInfoUI =  (temp,feel,date)=>{
    document.getElementById('temp').innerHTML = Math.round(temp) + "degrees";
    document.getElementById('content').innerHTML = feel;
    document.getElementById("date").innerHTML = date;
}

/* Extra Features */
// Disable buttons whole fetching data and save on the server
const onSendingData = ()=>{
    document.getElementById('generate').setAttribute('disabled',true);
    document.getElementById('generate').innerText = 'Loading';
    document.getElementById('zip').setAttribute('disabled',true);
    document.getElementById('feelings').setAttribute('disabled',true);
}
const onDataSended = ()=>{
    document.getElementById('generate').removeAttribute('disabled');
    document.getElementById('generate').innerText = 'Generate';
    document.getElementById('zip').removeAttribute('disabled');
    document.getElementById('feelings').removeAttribute('disabled');
}


// Load the data on start up 
onSendingData();
retrieveData().then(allData => {
    onDataSended();
    console.log(allData);
    if (isDefined(allData)
        && isDefined(allData.temp)
        && isDefined(allData.feel)
        && isDefined(allData.date)
        && isDefined(allData.zip)) {
            updateWeatherInfoUI(allData.temp,allData.feel,allData.date);
            document.getElementById('zip').value = allData.zip;
    }
})
