import { UtentiController } from "../UtentiController.js";
console.group("This is the handler of the utenti view");
console.log("E' il momento di caricare degli utenti! ( ^^)");
console.log("Just wanting to check the watching functionality");
export function loadUtenti() {
    console.group("Creazione di presentazioni di utenti");
    UtentiController.Read().then((utenti) => {
        console.log(utenti);
    });
    console.groupEnd();
}
console.groupEnd();
` <div class="d-flex align-items-start">
      <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home"
          type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
        <button class="nav-link" id="v-pills-utenti-tab" data-bs-toggle="pill" data-bs-target="#v-pills-utenti"
          type="button" role="tab" aria-controls="v-pills-utenti" aria-selected="false">Utenti</button>
                  <button class="nav-link" id="v-pills-allenamenti-tab" data-bs-toggle="pill" data-bs-target="#v-pills-allenamenti"
          type="button" role="tab" aria-controls="v-pills-allenamenti" aria-selected="false">Allenamenti</button>
      </div>
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"
          tabindex="0">This page is dedicated to the management of the users and the exercises. I mean puoi crearli, leggerli, eliminarli e modificarli</div>
        <div class="tab-pane fade" id="v-pills-utenti" role="tabpanel" aria-labelledby="v-pills-utenti-tab"
          tabindex="0">
        <header>Qui ci stanno gli utenti</header>
        <script src="js/views/Utente.js" type="module"></script>
        </div>
        <div class="tab-pane fade" id="v-pills-allenamenti" role="tabpanel" aria-labelledby="v-pills-allenamenti-tab"
          tabindex="0">Qui invece gli allenamenti</div>
      </div>
    </div>`;
