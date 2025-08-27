interface ApiResponse {
    success: boolean;
    error?: string;
}

class AuthController {
    static async login(identifier: string, password: string): Promise<ApiResponse> {
        return new Promise<ApiResponse>((resolve) => {
            $.ajax({
                url: "router.php?action=login&module=auth",
                method: "POST",
                contentType: "application/json", // tell server we're sending JSON
                data: JSON.stringify({
                    emailusername: identifier,
                    password: password,
                }),
                dataType: "json", // expect JSON back
                success: function (data: ApiResponse) {
                    resolve(data);
                },
                error: function (xhr, status, errorThrown) {
                    resolve({
                        success: false,
                        error: `AJAX error: ${status} - ${errorThrown}`,
                    });
                }
            });
        });
    }
    static async logout():Promise<ApiResponse>{
        return new Promise<ApiResponse>(
            (resolve)=>{
                $.ajax({
                    url:"router.php?action=logout&module=auth",
                    method:"GET",
                    contentType:"application/json",
                    dataType:"json",
                    success:function(data:ApiResponse){
                        resolve(data);
                    },
                    error: function (xhr, status, errorThrown) {
                    resolve({
                        success: false,
                        error: `AJAX error: ${status} - ${errorThrown}`,
                    });
                }
                })
            }
        )
    }
}

export { AuthController };
