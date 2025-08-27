import { formAuthentication } from "./views/Authenticate.js";
import { AuthController } from "./controllers/AuthController.js";
import { PianiController } from "./controllers/PianiController.js";
console.log("triying authentication");
window.onload = async function () {
  document.getElementById("btnLogOut")?.addEventListener('click',async ()=>{
    const res=await AuthController.logout();
    document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
});

  })
  console.log(document.cookie);
  AuthController.login("mato","111111112").then(res=>console.  log(res))
  PianiController.Read().then(res=>console.log(res))  
}
/*
const main=document.querySelector("main");
if(!main) return;
// Example: check if PHPSESSID exists
main.innerHTML="";
if (document.cookie.includes("PHPSESSID=")) {
  // main.appendChild();
} else {
  main.appendChild(formAuthentication());
}
  */