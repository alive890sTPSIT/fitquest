import { Allenamento } from "../../models/Allenamento";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

class AllenamentiController {
    // Overload signatures
    static Read(id: number): Promise<ApiResponse<Allenamento>>;
    static Read(): Promise<ApiResponse<Allenamento[]>>;

    // The actual implementation
    static async Read(id?: number): Promise<ApiResponse<Allenamento> | ApiResponse<Allenamento[]>> {
        if (id) {
            // Fetch single Allenamento
            return $.ajax({
                url: "router.php?action=ReadAllenamento&id=" + id,
                method: "GET",
                dataType: "json"
            });
        } else {
            // Fetch all Allenamenti
            return $.ajax({
                url: "router.php?action=ReadAllenamenti",
                method: "GET",
                dataType: "json"
            });
        }
    }

    static async Create(allenamento: Allenamento): Promise<ApiResponse<{ id: number }>> {
        return $.ajax({
            url: "router.php?action=CreateAllenamento",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(allenamento),
            dataType: "json"
        });
    }

    static async Update(allenamento: Allenamento): Promise<ApiResponse<void>> {
        return $.ajax({
            url: "router.php?action=UpdateAllenamento",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(allenamento),
            dataType: "json"
        });
    }

    static async Delete(id: number): Promise<ApiResponse<void>> {
        return $.ajax({
            url: `router.php?action=DeleteAllenamento&id=${id}`,
            method: "DELETE",
            dataType: "json"
        });
    }
}

export { AllenamentiController };
