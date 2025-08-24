import { Utente } from "../models/Utente";

class UtentiController {
    static async Read() {
        return $.ajax({
            url: "router.php?action=ReadUtenti",
            method: "GET",
            dataType: "json"
        });
    }

    static async Create(utente:Utente) {
        return $.ajax({
            url: "router.php?action=CreateUtente",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(utente),
            dataType: "json"
        });
    }
    static async Update(utente:Utente) {
        return $.ajax({
            url: "router.php?action=UpdateUtente",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(utente),
            dataType: "json"
        });
    }
    static async Delete(id:number) {
        return $.ajax({
            url: `router.php?action=DeleteUtente&id=${id}`,
            method: "DELETE",
            dataType: "json"
        });
    }
}


export { UtentiController };
