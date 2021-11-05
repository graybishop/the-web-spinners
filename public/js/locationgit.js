// const getPosition = () => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));

// const getUserCityState = async () => {
//     let position;
//     try {
//         position = await getPosition();
//     } catch (error) {
//         console.log(error);
//         return { error };
//     }

//     const { latitude, longitude } = position.coords;
//     let geoData;
//     try {
//         let geoResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6457baeadd874c80bd7a70f9ff672e82&no_anotations=1`);
//         geoData = await geoResponse.json();
//     } catch (error) {
//         console.log(error);
//         return { error };
//     }
//     let { city, state } = geoData.results[0].components;
//     return { city, state };
// };
