import { btnLogOut, formAuthentication } from "./views/Authenticate.js";
import { dashboard } from "./views/Dashboard.js";
import { PianiController } from "./controllers/PianiController.js";
window.onload = async function () {
    const header = document.querySelector("header");
    if (!header)
        return;
    header.appendChild(btnLogOut());
    const main = document.querySelector("main");
    if (!main)
        return;
    // Example: check if PHPSESSID exists
    const res = await PianiController.Read();
    main.innerHTML = "";
    if (res.success)
        main.appendChild(dashboard());
    else
        main.appendChild(formAuthentication());
};
/**
 * ALL THIS USES WORK
 */
// PianiController.Read().then(res=>console.log(res))  
// PianiController.Read(14).then(res=>console.log(res))  
// PianiController.Read(16).then(res=>console.log(res))  
// // PianiController.Delete(12).then(res=>console.log(res))  
// PianiController.Create({id:-1,utente_id:-1,nome:'testing controller',descrizione:'im just writing some description'})
// PianiController.Update({id:11,utente_id:-1,nome:'sorry reggae',descrizione:'you re being updated'}).then(res=>console.log(res))
/*
  */ 
