import { Utente } from "../models/Utente";

interface ApiReponse<T>{
    success:boolean,
    data?:T,
    error?:string
}
class UtentiController {
    // overload signatures (no static/async here)
    static Read(id: number): Promise<ApiReponse<Utente>>;
    static Read(): Promise<ApiReponse<Utente[]>>;

    // the actual implementation (with broadest params + async)
    static async Read(id?: number): Promise<ApiReponse<Utente> | ApiReponse<Utente[]>> {
        if (id) {
            // pretend: fetch single Utente
            return $.ajax({
                url: "router.php?action=ReadUtente&id=" + id,
                method: "GET",
                dataType: "json"
            });
        } else {
            // fetch all Utenti
            return $.ajax({
                url: "router.php?action=ReadUtenti",
                method: "GET",
                dataType: "json"
            });
        }
    }

    static async Create(utente:Utente):Promise<ApiReponse<{id:number}>> {
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
