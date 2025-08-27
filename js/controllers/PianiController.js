class PianiController {
    static async Read(id) {
        return new Promise((resolve) => {
            $.ajax({
                url: id
                    ? `router.php?action=read&module=piano&id=${id}`
                    : "router.php?action=read&module=piano",
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
    static async Create(piano) {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=create&module=piano",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(piano),
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
    static async Update(piano) {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=update&module=piano",
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(piano),
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
                url: `router.php?action=delete&module=piano&id=${id}`,
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
export { PianiController };
