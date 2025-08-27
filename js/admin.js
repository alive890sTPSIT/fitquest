import { UtentiController } from "./controllers/UtentiController.js";
import { AllenamentiController } from "./controllers/AllenamentiController.js";
import { gridUtenti } from "./views/Utenti.js";
import { gridAllenamenti } from "./views/Allenamenti.js";
window.onload = async function () {
    var _a, _b;
    //binding controls
    (_a = document.getElementById("v-pills-utenti-tab")) === null || _a === void 0 ? void 0 : _a.addEventListener('show.bs.tab', async function (event) {
        var _a, _b;
        document.getElementById("v-pills-utenti").innerHTML = "";
        (_a = document.getElementById("v-pills-utenti")) === null || _a === void 0 ? void 0 : _a.appendChild((gridUtenti((_b = (await UtentiController.Read()).data) !== null && _b !== void 0 ? _b : [])));
    });
    (_b = document.getElementById("v-pills-allenamenti-tab")) === null || _b === void 0 ? void 0 : _b.addEventListener('show.bs.tab', async function (event) {
        var _a, _b;
        document.getElementById("v-pills-allenamenti").innerHTML = "";
        (_a = document.getElementById("v-pills-allenamenti")) === null || _a === void 0 ? void 0 : _a.appendChild((gridAllenamenti((_b = (await AllenamentiController.Read()).data) !== null && _b !== void 0 ? _b : [])));
    });
};
console.groupEnd();
