import { UtentiController } from "./UtentiController.js";
console.group("Testing the data flow between fron and back end");
window.onload = function () {
    UtentiController.Read().then((data) => {
        console.log(data);
    });
    UtentiController.Create({ id: -1, nome: "Angel", username: "blessher", email: "imtooweak@gerstronger.com", password_hash: "00000000", data_iscrizione: new Date().toISOString() }).then((res) => {
        console.log(res);
    });
    UtentiController.Create({ id: -1, nome: "whyher", username: "runfromthis", email: "toodifficult@escape.com", password_hash: "00000000", data_iscrizione: new Date().toISOString() }).then((res) => {
        console.log(res);
    });
    UtentiController.Create({ id: 4, nome: "Tulio", username: "blesshim", email: "keepyourcool@listentoyour.self", password_hash: "11111111", data_iscrizione: new Date().toISOString() }).then((res) => {
        console.log(res);
    });
    UtentiController.Create({ id: 4, nome: "error", username: "yourtheoneblessed", email: "sheloves@shedoesntlove.whocares", password_hash: "justwantedtoseehersmileandbehappytheproblemisthatsomehowifellforherfuck", data_iscrizione: new Date().toISOString() }).then((res) => {
        console.log(res);
    });
    UtentiController.Update({ id: 12, nome: "itwasNOTanerror", username: "yourtheoneblessed", email: "sheloves@shedoesntlove.whocares", password_hash: "justwantedtoseehersmileandbehappytheproblemisthatsomehowifellforherfuck", data_iscrizione: new Date().toISOString() }).then((res) => {
        console.log(res);
    });
    // UtentiController.Delete(7).then((res) => {
    //     console.log(res);
    // });
};
console.groupEnd();
