
const profile = require('./profile');

//Select input on page to get username


  const form =  document.querySelector(".form-submit");
  const username = document.querySelector(".username");
  const submitUser = document.querySelector(".submit-btn");

  let userinfo = " ";

  username.addEventListener("focus",(e) => {
      if (e.target.value === "username"){
        e.target.value = " ";
      }
  });
  username.addEventListener("focusout",(e) => {
      if (e.target.value === " "){
        e.target.value = "username";
      }
  });
  form.addEventListener("submit", async function(e){
    e.preventDefault();
     userinfo += username.value;
    let users = [userinfo.trim()];
    let result = await users.forEach(profile.get)
    userinfo = " ";
    username.value = userinfo;
  });
