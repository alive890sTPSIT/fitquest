import { UtentiController } from "../controllers/UtentiController.js";
function gridUtenti(utenti) {
    const grid = document.createElement("div");
    grid.className = "row";
    grid.id = "grid-utenti";
    const c = document.createElement("div");
    c.className = "col-sm-6 col-md-4 mb-3";
    c.appendChild(cardUtente(formNewUtente()));
    grid.appendChild(c);
    utenti.forEach((utente) => {
        const col = document.createElement("div");
        col.className = "col-sm-6 col-md-4 mb-3";
        col.appendChild(cardUtente(formUtente(utente)));
        grid.appendChild(col);
    });
    return grid;
}
function formNewUtente() {
    const template = document.createElement("template");
    template.innerHTML = `
      <form>
        <div class="mb-3">
          <label class="form-label">ID</label>
          <span class="form-control-plaintext" id="utente-id"></span>
        </div>
        <div class="mb-3">
          <label for="utente-nome" class="form-label">Nome</label>
          <input type="text" class="form-control" id="utente-nome">
        </div>
        <div class="mb-3">
          <label for="utente-username" class="form-label">Username</label>
          <input type="text" class="form-control" id="utente-username">
        </div>
        <div class="mb-3">
          <label for="utente-email" class="form-label">Email</label>
          <input type="email" class="form-control" id="utente-email">
        </div>
        <div class="mb-3">
          <label for="utente-password" class="form-label">Password</label>
          <input type="password" class="form-control" id="utente-password">
        </div>
        <div class="mb-3">
          <label for="utente-data-iscrizione" class="form-label">Data iscrizione</label>
          <input type="datetime-local" class="form-control" id="utente-data-iscrizione">
        </div>
        <div class="mb-3">
  <button type="submit" class="btn btn-primary">Submit</button>
  <button class="btn btn-primary">Clear</button>

</div>

      </form>
    `;
    const form = template.content.firstElementChild;
    form.onsubmit = async (e) => {
        e.preventDefault();
        const utente = {
            id: 0,
            nome: (form.querySelector(`#utente-nome`)).value,
            username: (form.querySelector(`#utente-username`)).value,
            email: (form.querySelector(`#utente-email`)).value,
            password_hash: (form.querySelector(`#utente-password`)).value,
            data_iscrizione: (new Date((form.querySelector(`#utente-data-iscrizione`).value))).toISOString()
        };
        UtentiController.Create(utente).then((res) => {
            console.log(res);
            if (res.success) {
                UtentiController.Read(res.data.id).then((res) => {
                    console.log(res);
                    if (res.success) {
                        const c = document.createElement("div");
                        c.className = "col-sm-6 col-md-4 mb-3";
                        c.appendChild(cardUtente(formUtente(res.data)));
                        document.getElementById("grid-utenti").appendChild(c);
                    }
                });
            }
        });
    };
    form.querySelector("button.btn-primary:nth-of-type(2)").addEventListener('click', (e) => {
        e.preventDefault();
        form.reset();
    });
    return form;
}
function cardUtente(form) {
    const template = document.createElement("template");
    template.innerHTML = `
<div class="card">
  <div class="card-body">
    
  </div>
</div>`;
    const card = template.content.firstElementChild;
    card.querySelector(".card-body").appendChild(form);
    return card;
}
function formUtente(data) {
    const template = document.createElement("template");
    template.innerHTML = `
      <form>
        <div class="mb-3">
          <label class="form-label">ID</label>
          <span class="form-control-plaintext" id="utente-id-${data.id}"></span>
        </div>
        <div class="mb-3">
          <label for="utente-nome-${data.id}" class="form-label">Nome</label>
          <input type="text" class="form-control" id="utente-nome-${data.id}">
        </div>
        <div class="mb-3">
          <label for="utente-username-${data.id}" class="form-label">Username</label>
          <input type="text" class="form-control" id="utente-username-${data.id}">
        </div>
        <div class="mb-3">
          <label for="utente-email-${data.id}" class="form-label">Email</label>
          <input type="email" class="form-control" id="utente-email-${data.id}">
        </div>
        <div class="mb-3">
          <label for="utente-password-${data.id}" class="form-label">Password</label>
          <input type="password" class="form-control" id="utente-password-${data.id}">
        </div>
        <div class="mb-3">
          <label for="utente-data-iscrizione-${data.id}" class="form-label">Data iscrizione</label>
          <input type="datetime-local" class="form-control" id="utente-data-iscrizione-${data.id}">
        </div>
        <div class="mb-3">
  <button type="submit" class="btn btn-primary">Submit</button>
 <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalConfermaEliminazione">
  Delete
</button>
</div>

      </form>
    `;
    const form = template.content.firstElementChild;
    // Set the values dynamically
    form.querySelector(`#utente-id-${data.id}`).textContent = data.id.toString();
    (form.querySelector(`#utente-nome-${data.id}`)).value = data.nome;
    (form.querySelector(`#utente-username-${data.id}`)).value = data.username;
    (form.querySelector(`#utente-email-${data.id}`)).value = data.email;
    (form.querySelector(`#utente-password-${data.id}`)).value = data.password_hash;
    (form.querySelector(`#utente-data-iscrizione-${data.id}`)).value = new Date(data.data_iscrizione).toISOString().slice(0, 16);
    form.onsubmit = async (e) => {
        e.preventDefault();
        console.log(form.querySelector(`#utente-data-iscrizione-${data.id}`));
        const utente = {
            id: data.id,
            nome: (form.querySelector(`#utente-nome-${data.id}`)).value,
            username: (form.querySelector(`#utente-username-${data.id}`)).value,
            email: (form.querySelector(`#utente-email-${data.id}`)).value,
            password_hash: (form.querySelector(`#utente-password-${data.id}`)).value,
            data_iscrizione: (new Date((form.querySelector(`#utente-data-iscrizione-${data.id}`).value))).toISOString()
        };
        UtentiController.Update(utente).then((res) => {
            console.log(res);
        });
    };
    form.querySelector("button.btn-danger").addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById("btnConfermaEliminazione").onclick = function () {
            UtentiController.Delete(data.id).then((res) => {
                console.log(res);
                if (res.success) {
                    form.parentElement.parentElement.remove();
                }
            });
        };
    });
    // confirm delete handler
    return form;
}
export { gridUtenti };
