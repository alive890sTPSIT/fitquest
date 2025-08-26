class UtentiController {
    // the actual implementation (with broadest params + async)
    static async Read(id) {
        if (id) {
            // pretend: fetch single Utente
            return $.ajax({
                url: "router.php?action=ReadUtente&id=" + id,
                method: "GET",
                dataType: "json"
            });
        }
        else {
            // fetch all Utenti
            return $.ajax({
                url: "router.php?action=ReadUtenti",
                method: "GET",
                dataType: "json"
            });
        }
    }
    static async Create(utente) {
        return $.ajax({
            url: "router.php?action=CreateUtente",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(utente),
            dataType: "json"
        });
    }
    static async Update(utente) {
        return $.ajax({
            url: "router.php?action=UpdateUtente",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(utente),
            dataType: "json"
        });
    }
    static async Delete(id) {
        return $.ajax({
            url: `router.php?action=DeleteUtente&id=${id}`,
            method: "DELETE",
            dataType: "json"
        });
    }
}
export { UtentiController };
