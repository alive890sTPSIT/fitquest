import { Progresso } from "../../models/Progresso";

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

class ProgressiController {
    static async Read(id: number): Promise<ApiResponse<Progresso>>;
    static async Read(): Promise<ApiResponse<Progresso[]>>;

    static async Read(id?: number): Promise<ApiResponse<Progresso> | ApiResponse<Progresso[]>> {
        return new Promise((resolve) => {
            $.ajax({
                url: id
                    ? `router.php?action=readById&module=progresso&id=${id}`
                    : "router.php?action=read&module=progresso",
                method: "GET",
                dataType: "json",
                success: function (data: ApiResponse<Progresso> | ApiResponse<Progresso[]>) {
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

    static async Create(progresso: Progresso): Promise<ApiResponse<{ id: number }>> {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=create&module=progresso",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(progresso),
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

    static async Update(progresso: Progresso): Promise<ApiResponse<null>> {
        return new Promise((resolve) => {
            $.ajax({
                url: "router.php?action=update&module=progresso",
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(progresso),
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
                url: `router.php?action=delete&module=progresso&id=${id}`,
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

export { ProgressiController };
