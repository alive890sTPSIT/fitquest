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
  return new Promise((resolve) => {
    $.ajax({
      url: id
        ? `router.php?action=readById&module=allenamento&id=${id}`
        : "router.php?action=read&module=allenamento",
      method: "GET",
      dataType: "json",
      success: function (
        data: ApiResponse<Allenamento> | ApiResponse<Allenamento[]>
      ) {
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
