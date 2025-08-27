import { PianiController } from "../controllers/PianiController.js";
function gridPiani(piani) {
    const grid = document.createElement("div");
    grid.className = "row";
    grid.id = "grid-piani";
    const c = document.createElement("div");
    c.className = "col-sm-6 col-md-4 mb-3";
    c.appendChild(cardPiano(formNewPiano()));
    grid.appendChild(c);
    piani.forEach((piano) => {
        const col = document.createElement("div");
        col.className = "col-sm-6 col-md-4 mb-3";
        col.appendChild(cardPiano(formPiano(piano)));
        grid.appendChild(col);
    });
    return grid;
}
function formNewPiano() {
    const template = document.createElement("template");
    template.innerHTML = `
    <form>
      <div class="mb-3">
        <label class="form-label">ID</label>
        <span class="form-control-plaintext" id="piano-id"></span>
      </div>
      <div class="mb-3">
        <label for="piano-utente-id" class="form-label">Utente ID</label>
        <input type="number" class="form-control" id="piano-utente-id">
      </div>
      <div class="mb-3">
        <label for="piano-nome" class="form-label">Nome</label>
        <input type="text" class="form-control" id="piano-nome">
      </div>
      <div class="mb-3">
        <label for="piano-descrizione" class="form-label">Descrizione</label>
        <textarea class="form-control" id="piano-descrizione"></textarea>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="button" class="btn btn-secondary">Clear</button>
      </div>
    </form>
  `;
    const form = template.content.firstElementChild;
    form.onsubmit = async (e) => {
        e.preventDefault();
        const piano = {
            id: 0,
            utente_id: parseInt((form.querySelector("#piano-utente-id")).value),
            nome: (form.querySelector("#piano-nome")).value,
            descrizione: (form.querySelector("#piano-descrizione")).value,
        };
        PianiController.Create(piano).then((res) => {
            if (res.success) {
                PianiController.Read(res.data.id).then((res) => {
                    if (res.success) {
                        const c = document.createElement("div");
                        c.className = "col-sm-6 col-md-4 mb-3";
                        c.appendChild(cardPiano(formPiano(res.data)));
                        document.getElementById("grid-piani").appendChild(c);
                    }
                });
            }
        });
    };
    form.querySelector("button.btn-secondary").addEventListener("click", (e) => {
        e.preventDefault();
        form.reset();
    });
    return form;
}
function cardPiano(form) {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="card">
      <div class="card-body"></div>
    </div>
  `;
    const card = template.content.firstElementChild;
    card.querySelector(".card-body").appendChild(form);
    return card;
}
function formPiano(data) {
    const template = document.createElement("template");
    template.innerHTML = `
    <form>
      <div class="mb-3">
        <label class="form-label">ID</label>
        <span class="form-control-plaintext" id="piano-id-${data.id}"></span>
      </div>
      <div class="mb-3">
        <label for="piano-utente-id-${data.id}" class="form-label">Utente ID</label>
        <input type="number" class="form-control" id="piano-utente-id-${data.id}">
      </div>
      <div class="mb-3">
        <label for="piano-nome-${data.id}" class="form-label">Nome</label>
        <input type="text" class="form-control" id="piano-nome-${data.id}">
      </div>
      <div class="mb-3">
        <label for="piano-descrizione-${data.id}" class="form-label">Descrizione</label>
        <textarea class="form-control" id="piano-descrizione-${data.id}"></textarea>
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
    form.querySelector(`#piano-id-${data.id}`).textContent = data.id.toString();
    (form.querySelector(`#piano-utente-id-${data.id}`)).value = data.utente_id.toString();
    (form.querySelector(`#piano-nome-${data.id}`)).value = data.nome;
    (form.querySelector(`#piano-descrizione-${data.id}`)).value = data.descrizione;
    form.onsubmit = async (e) => {
        e.preventDefault();
        const piano = {
            id: data.id,
            utente_id: parseInt((form.querySelector(`#piano-utente-id-${data.id}`)).value),
            nome: (form.querySelector(`#piano-nome-${data.id}`)).value,
            descrizione: (form.querySelector(`#piano-descrizione-${data.id}`)).value,
        };
        PianiController.Update(piano).then((res) => {
            console.log(res);
        });
    };
    form.querySelector("button.btn-danger").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("btnConfermaEliminazione").onclick = function () {
            PianiController.Delete(data.id).then((res) => {
                if (res.success) {
                    form.parentElement.parentElement.remove();
                }
            });
        };
    });
    return form;
}
export { gridPiani };
