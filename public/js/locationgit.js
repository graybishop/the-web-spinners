const successCallback = (position) => {
    console.log(position);
}

const errorCallback = (error) => {
    console.error(error);
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

const successfulLookup = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6457baeadd874c80bd7a70f9ff672e82&no_anotations=1`)
        .then(response => response.json())
        .then(console.log)
};

navigator.geolocation.getCurrentPosition(successfulLookup, console.log);