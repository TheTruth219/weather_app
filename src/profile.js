const https =require('https');
const http = require("http");
const api = require("./api.json");
////////////////////////////FORM FIELDS////////////////////////////////////



////////////////////////////FORM FIELDS////////////////////////////////////
const report = document.querySelector(".report");

/////////////////////////////////CONVERTER FUNCTIONS/////////////////////////////////////////////
function convertTemp (Kelvin_Temp){
  let Frnht = Kelvin_Temp * 9/5 -459.67;
  return Math.floor(Frnht);
}
function convertAir(Hpa){
  let Hg = Hpa*0.02953;
  return Math.round(Hg);
}
function getTime(code){
  let myDate = new Date(1000*code);
  let fullDate = myDate.toLocaleTimeString('en-us').slice(0,4);
  return fullDate;

}
function getMiles(meters){
  let miles= meters/1600;
  return Math.round(miles);
}

/////////////////////////////////CONVERTER FUNCTIONS/////////////////////////////////////////////
function printError (error) {
  console.error(error.message);
}

 function printWeather(zip, temp) {
  const message = `It is ${temp}&deg F in ${zip} right now.`;
  console.log(message);
     return  report.innerHTML = message;
}

  function locationWeather(zip,temp, desc, l, h, pres, hum, vis, w, sr, ss){
    const city = document.querySelector(".card-title");
    const description =document.querySelector(".card-subtitle");
    const temperature = document.querySelector(".temp");
    const sunrise = document.querySelector(".sunrise-time");
    const sunset = document.querySelector(".sunset-time");
    const low = document.querySelector(".low");
    const high = document.querySelector(".high");
    const pressure = document.querySelector(".pressure");
    const humidity = document.querySelector(".humidity");
    const visibility = document.querySelector(".visibility");
    const wind = document.querySelector(".wind");
   // const cardSections= [city, description, temperature, low, high, pressure, humidity, visibility, wind];
   city.innerHTML= zip;
   description.innerHTML= `There's ${desc} at the moment`;
   temperature.innerHTML= `${temp}&deg `;
   low.innerHTML=`${l} &degF`;
   high.innerHTML =`${h} &degF`;
   pressure.innerHTML = `${pres}inHg`;
   humidity.innerHTML =`${hum}%`;
   visibility.innerHTML = `${getMiles(vis)} miles`;
   wind.innerHTML = `${w}mph`;
   sunrise.innerHTML= `${getTime(sr)} am`;
   sunset.innerHTML = `${getTime(ss)} pm`;

  return console.log(getTime(sr));

}

function get (zip)  {
  try {
      const request = https.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${api.key}`, response => {
        if (response.statusCode === 200) {
            let body = "";
            response.on('data', data =>{
              body += data.toString();
            });
            response.on('end', () => {
              try {
                    const profile =JSON.parse(body);

                    printWeather(profile.name, convertTemp(profile.main.temp));
                    locationWeather(profile.name,convertTemp(profile.main.temp),
                          profile.weather[0].description,
                          convertTemp(profile.main.temp_min),
                          convertTemp(profile.main.temp_max),
                          convertAir(profile.main.pressure),
                          profile.main.humidity,
                          profile.visibility,
                          profile.wind.speed,profile.sys.sunrise,profile.sys.sunset);


              }catch (error) {
                printError(error);
                }
              });
        }else {
            const message = `Zip Code ${zip} was ${http.STATUS_CODES[response.statusCode].toLowerCase()}. Try somewhere that ACTUALLY exists next time :)`;
            report.innerHTML= message;
            const statusCodeError = new Error(message);
            printError(statusCodeError);
        }

      });

      request.on('error', printError);

  } catch (error) {
      printError(error);
  }
}
module.exports.get = get;
