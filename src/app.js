if (module.hot) {
  module.hot.accept();
}
// import "./css/styles.compact.css"
const profile = require('./profile');



//Select input on page to get zipInput
  const form =  document.querySelector(".form-submit");
  const zipInput = document.querySelector(".zipInput");
  const submitBtn = document.querySelector(".submit-btn");

  let userinfo = " ";

  zipInput.addEventListener("focus",(e) => {
      if (e.target.value === "Enter Zip Code"){
        e.target.value = " ";
      }
  });
  zipInput.addEventListener("focusout",(e) => {
      if (e.target.value === " "){
        e.target.value = "Enter Zip Code";
      }
  });
  form.addEventListener("submit", async function(e){
    e.preventDefault();
     userinfo += zipInput.value;
    let users = [userinfo.trim()];
    let result = await users.forEach(profile.get)
    userinfo = " ";
    zipInput.value = userinfo;
  });
