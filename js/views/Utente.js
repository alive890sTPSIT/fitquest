import { UtentiController } from "../UtentiController.js";
console.group("This is the handler of the utenti view");
console.log("E' il momento di caricare degli utenti! ( ^^)");
console.log("Just wanting to check the watching functionality");
export function loadUtenti() {
    console.group("Creazione di presentazioni di utenti");
    UtentiController.Read().then((utenti) => {
        console.log(utenti);
    });
    console.groupEnd();
}
console.groupEnd();
` `;
