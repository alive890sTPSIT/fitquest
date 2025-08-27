import { Utente } from "../../models/Utente";
import { AuthController } from "../controllers/AuthController.js";
import { UtentiController } from "../controllers/UtentiController.js";

export function formAuthentication(): HTMLElement {
  const template = document.createElement("template");
  template.innerHTML = `
    <div class="container">
      <div class="container">
        <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link active" id="tab-login" data-bs-toggle="pill" href="#pills-login" role="tab"
              aria-controls="pills-login" aria-selected="true">Login</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="tab-register" data-bs-toggle="pill" href="#pills-register" role="tab"
              aria-controls="pills-register" aria-selected="false">Register</a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form>
              <p class="text-center">Accedi</p>
              <div class="form-outline mb-4">
                <input type="text" id="loginName" class="form-control" inputmode="email" />
                <label class="form-label" for="loginName">Email or username</label>
              </div>
              <div class="form-outline mb-4">
                <input type="password" id="loginPassword" class="form-control" />
                <label class="form-label" for="loginPassword">Password</label>
              </div>
              <button id="btnSign" type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
            </form>
          </div>
          <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form>
              <p class="text-center">Register</p>
              <div class="form-outline mb-4">
                <input type="text" id="registerName" class="form-control" />
                <label class="form-label" for="registerName">Name</label>
              </div>
              <div class="form-outline mb-4">
                <input type="text" id="registerUsername" class="form-control" />
                <label class="form-label" for="registerUsername">Username</label>
              </div>
              <div class="form-outline mb-4">
                <input type="email" id="registerEmail" class="form-control" />
                <label class="form-label" for="registerEmail">Email</label>
              </div>
              <div class="form-outline mb-4">
                <input type="password" id="registerPassword" class="form-control" />
                <label class="form-label" for="registerPassword">Password</label>
              </div>
              <button type="submit" class="btn btn-primary btn-block mb-3">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  const card = template.content.cloneNode(true) as DocumentFragment;
  const container = card.querySelector(".container > .container") as HTMLElement;

  const formRegister = container.querySelector("#pills-register form") as HTMLFormElement;
  formRegister.onsubmit = async (e) => {
    e.preventDefault();
    const utente: Utente = {
      id: 0,
      nome: (formRegister.querySelector<HTMLInputElement>("#registerName")!).value,
      username: (formRegister.querySelector<HTMLInputElement>("#registerUsername")!).value,
      email: (formRegister.querySelector<HTMLInputElement>("#registerEmail")!).value,
      password_hash: (formRegister.querySelector<HTMLInputElement>("#registerPassword")!).value,
      data_iscrizione: new Date().toISOString(),
    };
    UtentiController.Create(utente).then((res) => {
      if (res.success) {
        UtentiController.Read(res.data!.id).then((res) => {
          if (res.success) location.reload();
        });
      }
    });
  };

  const formSign = container.querySelector("#pills-login form") as HTMLFormElement;
  formSign.onsubmit = async (e) => {
    e.preventDefault();
    console.log((formSign.querySelector<HTMLInputElement>("#loginName")!).value)
    console.log((formSign.querySelector<HTMLInputElement>("#loginPassword")!).value)
    AuthController.login(
      (formSign.querySelector<HTMLInputElement>("#loginName")!).value,
      (formSign.querySelector<HTMLInputElement>("#loginPassword")!).value
    ).then((res) => {
      if (res.success) location.reload();
    });
  };

  return container;
}
