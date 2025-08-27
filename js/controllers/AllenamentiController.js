class AllenamentiController {
    // The actual implementation
    static async Read(id) {
        return new Promise((resolve) => {
            $.ajax({
                url: id
                    ? `router.php?action=readById&module=allenamento&id=${id}`
                    : "router.php?action=read&module=allenamento",
                method: "GET",
                dataType: "json",
                success: function (data) {
                    resolve(data);
                },
                error: function (xhr, status, errorThrown) {
                    resolve({
                        success: false,
                        error: `AJAX error: ${status} - ${errorThrown}`,
                    });
                },
            });
        });
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
