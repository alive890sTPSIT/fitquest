class UtentiController {
    static async Read() {
        const res = await fetch("router.php?action=ReadUtenti");
        return await res.json();
    }
    static async Create(utente) {
        const res = await fetch("router.php?action=CreateUtente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(utente)
        });
        // parse the response JSON
        return await res.json();
    }
}
export { UtentiController };
