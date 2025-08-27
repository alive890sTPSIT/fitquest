import { Allenamento } from "../../models/Allenamento.js";
import { AllenamentiController } from "../controllers/AllenamentiController.js";

function gridAllenamenti(allenamenti: Allenamento[]): HTMLDivElement {
  const grid = document.createElement("div");
  grid.className = "row";
  grid.id = "grid-allenamenti";

  const c = document.createElement("div");
  c.className = "col-sm-6 col-md-4 mb-3";
  c.appendChild(cardAllenamento(formNewAllenamento()));
  grid.appendChild(c);

  allenamenti.forEach((allenamento) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 mb-3";
    col.appendChild(cardAllenamento(formAllenamento(allenamento)));
    grid.appendChild(col);
  });

  return grid;
}

function formNewAllenamento(): HTMLFormElement {
  const template = document.createElement("template");
  template.innerHTML = `
    <form>
      <div class="mb-3">
        <label class="form-label">ID</label>
        <span class="form-control-plaintext" id="allenamento-id"></span>
      </div>
      <div class="mb-3">
        <label for="allenamento-titolo" class="form-label">Titolo</label>
        <input type="text" class="form-control" id="allenamento-titolo">
      </div>
      <div class="mb-3">
        <label for="allenamento-descrizione" class="form-label">Descrizione</label>
        <textarea class="form-control" id="allenamento-descrizione"></textarea>
      </div>
      <div class="mb-3">
        <label for="allenamento-durata" class="form-label">Durata (minuti)</label>
        <input type="number" class="form-control" id="allenamento-durata">
      </div>
      <div class="mb-3">
        <label for="allenamento-intensita" class="form-label">Intensità</label>
        <select class="form-control" id="allenamento-intensita">
          <option value="bassa">Bassa</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="button" class="btn btn-secondary">Clear</button>
      </div>
    </form>
  `;

  const form = template.content.firstElementChild as HTMLFormElement;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const allenamento: Allenamento = {
      id: 0,
      titolo: (form.querySelector<HTMLInputElement>("#allenamento-titolo")!).value,
      descrizione: (form.querySelector<HTMLTextAreaElement>("#allenamento-descrizione")!).value,
      durata: parseInt((form.querySelector<HTMLInputElement>("#allenamento-durata")!).value),
      intensita: (form.querySelector<HTMLSelectElement>("#allenamento-intensita")!).value,
    };

    AllenamentiController.Create(allenamento).then((res) => {
      console.log(res);
      if (res.success) {
        AllenamentiController.Read(res.data!.id).then((res) => {
          console.log(res);
          if (res.success) {
            const c = document.createElement("div");
            c.className = "col-sm-6 col-md-4 mb-3";
            c.appendChild(cardAllenamento(formAllenamento(res.data!)));
            document.getElementById("grid-allenamenti")!.appendChild(c);
          }
        });
      }
    });
  };

  form.querySelector("button.btn-secondary")!.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
  });

  return form;
}

function cardAllenamento(form: HTMLFormElement): HTMLDivElement {
  const template = document.createElement("template");
  template.innerHTML = `
    <div class="card">
      <div class="card-body"></div>
    </div>
  `;
  const card = template.content.firstElementChild as HTMLDivElement;
  card.querySelector(".card-body")!.appendChild(form);
  return card;
}

function formAllenamento(data: Allenamento): HTMLFormElement {
  const template = document.createElement("template");
  template.innerHTML = `
    <form>
      <div class="mb-3">
        <label class="form-label">ID</label>
        <span class="form-control-plaintext" id="allenamento-id-${data.id}"></span>
      </div>
      <div class="mb-3">
        <label for="allenamento-titolo-${data.id}" class="form-label">Titolo</label>
        <input type="text" class="form-control" id="allenamento-titolo-${data.id}">
      </div>
      <div class="mb-3">
        <label for="allenamento-descrizione-${data.id}" class="form-label">Descrizione</label>
        <textarea class="form-control" id="allenamento-descrizione-${data.id}"></textarea>
      </div>
      <div class="mb-3">
        <label for="allenamento-durata-${data.id}" class="form-label">Durata (minuti)</label>
        <input type="number" class="form-control" id="allenamento-durata-${data.id}">
      </div>
      <div class="mb-3">
        <label for="allenamento-intensita-${data.id}" class="form-label">Intensità</label>
        <select class="form-control" id="allenamento-intensita-${data.id}">
          <option value="bassa">Bassa</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalConfermaEliminazione">
          Delete
        </button>
      </div>
    </form>
  `;

  const form = template.content.firstElementChild as HTMLFormElement;

  (form.querySelector(`#allenamento-id-${data.id}`) as HTMLElement).textContent = data.id.toString();
  (form.querySelector<HTMLInputElement>(`#allenamento-titolo-${data.id}`)!).value = data.titolo;
  (form.querySelector<HTMLTextAreaElement>(`#allenamento-descrizione-${data.id}`)!).value = data.descrizione;
  (form.querySelector<HTMLInputElement>(`#allenamento-durata-${data.id}`)!).value = data.durata.toString();
  (form.querySelector<HTMLSelectElement>(`#allenamento-intensita-${data.id}`)!).value = data.intensita;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const allenamento: Allenamento = {
      id: data.id,
      titolo: (form.querySelector<HTMLInputElement>(`#allenamento-titolo-${data.id}`)!).value,
      descrizione: (form.querySelector<HTMLTextAreaElement>(`#allenamento-descrizione-${data.id}`)!).value,
      durata: parseInt((form.querySelector<HTMLInputElement>(`#allenamento-durata-${data.id}`)!).value),
      intensita: (form.querySelector<HTMLSelectElement>(`#allenamento-intensita-${data.id}`)!).value,
    };
    AllenamentiController.Update(allenamento).then((res) => {
      console.log(res);
    });
  };

  form.querySelector("button.btn-danger")!.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("btnConfermaEliminazione")!.onclick = function () {
      AllenamentiController.Delete(data.id).then((res) => {
        if (res.success) {
          form.parentElement!.parentElement!.remove();
        }
      });
    };
  });

  return form;
}

export { gridAllenamenti };
