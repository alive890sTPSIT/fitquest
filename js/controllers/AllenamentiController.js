class AllenamentiController {
    // The actual implementation
    static async Read(id) {
        if (id) {
            // Fetch single Allenamento
            return $.ajax({
                url: "router.php?action=ReadAllenamento&id=" + id,
                method: "GET",
                dataType: "json"
            });
        }
        else {
            // Fetch all Allenamenti
            return $.ajax({
                url: "router.php?action=ReadAllenamenti",
                method: "GET",
                dataType: "json"
            });
        }
    }
    static async Create(allenamento) {
        return $.ajax({
            url: "router.php?action=CreateAllenamento",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(allenamento),
            dataType: "json"
        });
    }
    static async Update(allenamento) {
        return $.ajax({
            url: "router.php?action=UpdateAllenamento",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(allenamento),
            dataType: "json"
        });
    }
    static async Delete(id) {
        return $.ajax({
            url: `router.php?action=DeleteAllenamento&id=${id}`,
            method: "DELETE",
            dataType: "json"
        });
    }
}
export { AllenamentiController };
