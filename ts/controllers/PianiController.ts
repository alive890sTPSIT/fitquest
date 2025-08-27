import { Piano } from "../../models/Piano";

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

class PianiController {
    static async Read(id: number): Promise<ApiResponse<Piano>>;
    static async Read(): Promise<ApiResponse<Piano[]>>;

    static async Read(id?: number): Promise<ApiResponse<Piano> | ApiResponse<Piano[]>> {
        return new Promise((resolve) => {
            $.ajax({
                url: id
                    ? `router.php?action=read&module=piano&id=${id}`
                    : "router.php?action=read&module=piano",
                method: "GET",
                dataType: "json",
                success: function (data: ApiResponse<Piano> | ApiResponse<Piano[]>) {
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

    static async Create(piano: Piano): Promise<ApiResponse<{ id: number }>> {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=create&module=piano",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(piano),
                dataType: "json",
                success: function (data: ApiResponse<{ id: number }>) {
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

    static async Update(piano: Piano): Promise<ApiResponse<null>> {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=update&module=piano",
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(piano),
                dataType: "json",
                success: function (data: ApiResponse<null>) {
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

    static async Delete(id: number): Promise<ApiResponse<null>> {
        return new Promise((resolve) => {
            $.ajax({
                url: `router.php?action=delete&module=piano&id=${id}`,
                method: "DELETE",
                dataType: "json",
                success: function (data: ApiResponse<null>) {
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
