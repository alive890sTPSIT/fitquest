import { PianiController } from "../controllers/PianiController.js";
import { ProgressiController } from "../controllers/ProgressiController.js";
import { gridPiani } from "./Piani.js";
import { gridProgressi } from "./Progressi.js";
export function dashboard() {
    var _a, _b;
    const template = document.createElement("template");
    template.innerHTML = `
        <div class="container-xxl mt-4 mb-4">
    <h1 class="text-center">FitQuest</h1>
    <p class="text-center">Gestisci i tuoi piani e controlla i tuoi progressi</p>
    <div class="row">
      <div class="col-2">
        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home"
            type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>

          <button class="nav-link" id="v-pills-piani-tab" data-bs-toggle="pill" data-bs-target="#v-pills-piani"
            type="button" role="tab" aria-controls="v-pills-piani" aria-selected="false">Piani</button>
          <button class="nav-link" id="v-pills-progressi-tab" data-bs-toggle="pill"
            data-bs-target="#v-pills-progressi" type="button" role="tab" aria-controls="v-pills-progressi"
            aria-selected="false">Progressi</button>
        </div>
      </div>
      <div class="col-10">
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"
            tabindex="0">This page is dedicated to the management of your training plans and to track your progresses</div>

          <div class="tab-pane fade" id="v-pills-piani" role="tabpanel" aria-labelledby="v-pills-piani-tab"
            tabindex="0"></div>

          <div class="tab-pane fade" id="v-pills-progressi" role="tabpanel" aria-labelledby="v-pills-progressi-tab"
            tabindex="0"></div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="modalConfermaEliminazione" tabindex="-1" aria-labelledby="modalConfermaEliminazioneLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalConfermaEliminazioneLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Confermi L'eliminazione?</p>
            <p></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="btnConfermaEliminazione">Elimina</button>
          </div>
        </div>
      </div>
  </div>
  </div>
    `;
    const dashboard = template.content.firstElementChild;
    (_a = dashboard.querySelector("#v-pills-piani-tab")) === null || _a === void 0 ? void 0 : _a.addEventListener('show.bs.tab', async function (event) {
        var _a;
        dashboard.querySelector("#v-pills-piani").innerHTML = "";
        dashboard.querySelector("#v-pills-piani")
            .appendChild(gridPiani((_a = (await (PianiController.Read())).data) !== null && _a !== void 0 ? _a : []));
    });
    (_b = dashboard.querySelector("#v-pills-progressi-tab")) === null || _b === void 0 ? void 0 : _b.addEventListener('show.bs.tab', async (event) => {
        var _a;
        dashboard.querySelector("#v-pills-progressi").innerHTML = "";
        dashboard.querySelector("#v-pills-progressi")
            .appendChild(gridProgressi((_a = (await (ProgressiController.Read())).data) !== null && _a !== void 0 ? _a : []));
    });
    return dashboard;
}
