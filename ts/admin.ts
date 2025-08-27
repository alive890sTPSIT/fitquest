import { Utente } from "../models/Utente.js";
import { UtentiController } from "./controllers/UtentiController.js";
import { AllenamentiController } from "./controllers/AllenamentiController.js";
import { gridUtenti } from "./views/Utenti.js";
import { gridAllenamenti } from "./views/Allenamenti.js";
window.onload = async function () {
  //binding controls
  document.getElementById("v-pills-utenti-tab")?.addEventListener('show.bs.tab', async function (event) {
    document.getElementById("v-pills-utenti")!.innerHTML = "";
    document.getElementById("v-pills-utenti")?.appendChild((gridUtenti((await UtentiController.Read()).data ?? [])));
  });
  document.getElementById("v-pills-allenamenti-tab")?.addEventListener('show.bs.tab', async function (event) {
    document.getElementById("v-pills-allenamenti")!.innerHTML = "";
    document.getElementById("v-pills-allenamenti")?.appendChild((gridAllenamenti((await AllenamentiController.Read()).data ?? [])));
  });
}


console.groupEnd()