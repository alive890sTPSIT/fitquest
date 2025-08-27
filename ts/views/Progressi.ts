import { Allenamento } from "../../models/Allenamento.js";
import { Progresso } from "../../models/Progresso.js";
import { AllenamentiController } from "../controllers/AllenamentiController.js";
import { ProgressiController } from "../controllers/ProgressiController.js";
function card(form: HTMLFormElement): HTMLDivElement {
  const template = document.createElement("template");
  template.innerHTML = `
    <div class="card">
      <div class="card-body"></div>
    </div>
  `;

  const card = template.content.firstElementChild as HTMLDivElement;
  (card.querySelector(".card-body") as HTMLDivElement).appendChild(form);
  return card;
}

export function gridProgressi(progressi: Progresso[]): HTMLElement {
  const template = document.createElement("template");
  template.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-4" id="new-progresso-column">
          allenamenti reader
        </div>
        <div class="col-8" id="progressi-column">
          <!-- List group will go here -->
        </div>
      </div>
    </div>
  `;

  const container = template.content.firstElementChild as HTMLElement;
  const newProgressoColumn = container.querySelector("#new-progresso-column") as HTMLElement;
  AllenamentiController.Read().then(
    res=>{
        console.log(res)
        newProgressoColumn.appendChild(card(formNewProgresso(res.data??[])))
    }
  )

  // Get the column where the list group will go
  const progressiColumn = container.querySelector("#progressi-column") as HTMLElement;

  // Create Bootstrap list group
  const listGroup = document.createElement("ul");
  listGroup.className = "list-group";

  progressi.forEach((p) => {
    const item = document.createElement("li");
    item.className = "list-group-item";

    // Here we build the inner HTML of each item
    item.innerHTML = `
      <strong>ID:</strong> ${p.id} <br>
      <strong>Allenamento:</strong> ${p.allenamento_id} <br>
      <strong>Data:</strong> ${p.data} <br>
      <strong>Commenti:</strong> ${p.commenti}
    `;

    listGroup.appendChild(item);
  });

  progressiColumn.appendChild(listGroup);

  return container;
}
  


function formNewProgresso(allenamenti: Allenamento[]): HTMLFormElement {
    
  const template = document.createElement("template");
  template.innerHTML = `
    <form>
  <div class="mb-3">
    <label class="form-label">ID</label>
    <span class="form-control-plaintext" id="progresso-id">New Id</span>
  </div>

  <!-- Utente ID removed -->

  <div class="mb-3">
    <label for="comboInput" class="form-label">Allenamento</label>
    <div class="position-relative w-100">
      <input type="text" id="comboInput" class="form-control" placeholder="Search...">
      <ul id="comboDropdown" class="list-group position-absolute w-100 mt-1" 
          style="z-index: 1000; max-height: 10rem; overflow-y: auto; display: none;">
      </ul>
    </div>
  </div>

  <div class="mb-3">
    <label for="progresso-commenti" class="form-label">Commenti</label>
    <textarea class="form-control" id="progresso-commenti"></textarea>
  </div>

  <div class="mb-3">
    <button type="submit" class="btn btn-primary">Submit</button>
    <button type="button" class="btn btn-secondary">Clear</button>
  </div>
</form>

  `;

  const form = template.content.firstElementChild as HTMLFormElement;

  // Setup the combo-box list for Allenamenti
  const comboInput = form.querySelector<HTMLInputElement>("#comboInput")!;
  const comboDropdown = form.querySelector<HTMLUListElement>("#comboDropdown")!;
  
  // Populate list items
  allenamenti.forEach(a => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.dataset.id = a.id.toString(); // store id
    li.textContent = a.titolo;
    comboDropdown.appendChild(li);
  });

  const listItems = Array.from(comboDropdown.querySelectorAll("li"));

  // Live filter
  comboInput.addEventListener("input", () => {
    const value = comboInput.value.toLowerCase();
    let visibleCount = 0;
    listItems.forEach(item => {
      if (item.textContent!.toLowerCase().includes(value) && visibleCount < 5) {
        item.style.display = "";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });
    comboDropdown.style.display = visibleCount > 0 ? "block" : "none";
  });

  // Select an allenamento
  let selectedAllenamentoId: number | null = null;
  listItems.forEach(item => {
    item.addEventListener("click", () => {
      comboInput.value = item.textContent!;
      selectedAllenamentoId = parseInt(item.dataset.id!);
      comboDropdown.style.display = "none";
    });
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", e => {
    if (!comboInput.contains(e.target as Node) && !comboDropdown.contains(e.target as Node)) {
      comboDropdown.style.display = "none";
    }
  });

  // Handle form submit
  form.onsubmit = async (e) => {
    e.preventDefault();
    if (!selectedAllenamentoId) {
      alert("Please select an Allenamento!");
      return;
    }

    const progresso: Progresso = {
      id: 0,
      utente_id: 0,
      allenamento_id: selectedAllenamentoId,
      data: (new Date()).toISOString(),
      commenti: (form.querySelector<HTMLTextAreaElement>("#progresso-commenti")!).value
    };

    const res = await ProgressiController.Create(progresso);
    if (res.success) {
        const listGroup=document.querySelector("#progressi-column > ul") as HTMLUListElement;
    const item = document.createElement("li");
    item.className = "list-group-item";

    // Here we build the inner HTML of each item
    item.innerHTML = `
      <strong>ID:</strong> ${res.data?.id} <br>
      <strong>Allenamento:</strong> ${selectedAllenamentoId} <br>
      <strong>Data:</strong> ${progresso.data.slice(0,10)} <br>
      <strong>Commenti:</strong> ${progresso.commenti}
    `;

    listGroup.appendChild(item);
      selectedAllenamentoId = null;
    }
  };

  // Clear button
  form.querySelector("button.btn-secondary")!.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    selectedAllenamentoId = null;
  });

  return form;}
/**
 * THIS IS THE ALLENAMENTI READER BETA
 * 
<div class="position-relative w-100">
  <input type="text" id="comboInput" class="form-control" placeholder="Search...">
  <ul id="comboDropdown" class="list-group position-absolute w-100 mt-1" style="z-index: 1000; max-height: 10rem; overflow-y: auto; display: none;">
    <li class="list-group-item">Apple</li>
    <li class="list-group-item">Banana</li>
    <li class="list-group-item">Cherry</li>
    <li class="list-group-item">Date</li>
    <li class="list-group-item">Grape</li>
    <li class="list-group-item">Orange</li>
    <li class="list-group-item">Pineapple</li>
  </ul>
</div>

<script>
const input = document.getElementById('comboInput');
const dropdown = document.getElementById('comboDropdown');
const items = Array.from(dropdown.querySelectorAll('li'));


input.addEventListener('input', () => {
  const value = input.value.toLowerCase();
  let visibleCount = 0;
  
  items.forEach(item => {
    if (item.textContent.toLowerCase().includes(value) && visibleCount < 5) {
      item.style.display = '';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });
  
  dropdown.style.display = visibleCount > 0 ? 'block' : 'none';
});

items.forEach(item => {
  item.addEventListener('click', () => {
    input.value = item.textContent;
    dropdown.style.display = 'none';
  });
});

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!input.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});
</script>
 */