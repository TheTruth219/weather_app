const https =require('https');
const http = require("http");
const report = document.querySelector(".report");
function printError (error) {
  console.error(error.message);
}

async function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    await console.log(message);
     return  report.innerHTML = message;


}

function get (username)  {
  try {
      const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
        if (response.statusCode === 200) {
            let body = "";
            response.on('data', data =>{
              body += data.toString();
            });
            response.on('end', () => {
              try {
                const profile =JSON.parse(body);
                printMessage(username, profile.badges.length, profile.points.JavaScript);
              }catch (error) {
                printError(error);
                }
              });
        }else {
            const message = `The profile for ${username} was ${http.STATUS_CODES[response.statusCode].toLowerCase()}. Try someone you ACTUALLY know next time :)`;
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
