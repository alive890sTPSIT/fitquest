class ProgressiController {
    static async Read(id) {
        return new Promise((resolve) => {
            $.ajax({
                url: id
                    ? `router.php?action=readById&module=progresso&id=${id}`
                    : "router.php?action=read&module=progresso",
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
    static async Create(progresso) {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=create&module=progresso",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(progresso),
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
    static async Update(progresso) {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=update&module=progresso",
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(progresso),
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
    static async Delete(id) {
        return new Promise((resolve) => {
            $.ajax({
                url: `router.php?action=delete&module=progresso&id=${id}`,
                method: "DELETE",
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
}
export { ProgressiController };
