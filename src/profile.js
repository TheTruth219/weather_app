const https =require('https');
const http = require("http");
const api = require("./api.json");

const report = document.querySelector(".report");

function convertTemp (Kelvin_Temp){
  let Frnht = Kelvin_Temp * 9/5 -459.67;
  return Math.floor(Frnht);
}
function printError (error) {
  console.error(error.message);
}

async function printWeather(zip, temp) {
  const message = `It is ${temp}&deg F in ${zip} right now.`;
    await console.log(message);
     return  report.innerHTML = message;


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
              }catch (error) {
                printError(error);
                }
              });
        }else {
            const message = `The location for ${zip} was ${http.STATUS_CODES[response.statusCode].toLowerCase()}. Try somewhere you ACTUALLY know next time :)`;
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
