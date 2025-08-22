"use strict";
async function sendUserData(user) {
    const res = await fetch("validate.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log("Server response:", data);
}
// Example usage
sendUserData({ id: 1, nome: "Alice",username:"rossi", email: "alice@example.com" ,password: "securepassword", date_iscrizione: new Date().toISOString() });
// Try with invalid email
sendUserData({ id: 2, name: "Bob", email: "not-an-email" });
