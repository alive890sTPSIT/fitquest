<!DOCTYPE html>
<html>

<head>
  <title>TS + PHP + JSON Schema</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="js/main.js" type="module"></script>
</head>

<body>
  <div class="container-xxl mt-4 mb-4">
    <h1 class="text-center">FitQuest</h1>
    <p class="text-center">Gestione utenti e allenamenti</p>
    <div class="row">
      <div class="col-2">
          <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home"
              type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
            <button class="nav-link" id="v-pills-utenti-tab" data-bs-toggle="pill" data-bs-target="#v-pills-utenti"
              type="button" role="tab" aria-controls="v-pills-utenti" aria-selected="false">Utenti</button>
            <button class="nav-link" id="v-pills-allenamenti-tab" data-bs-toggle="pill"
              data-bs-target="#v-pills-allenamenti" type="button" role="tab" aria-controls="v-pills-allenamenti"
              aria-selected="false">Allenamenti</button>
          </div>
        </div>
      <div class="col-10">
        <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"
              tabindex="0">This page is dedicated to the management of the users and the exercises. I mean puoi crearli,
              leggerli, eliminarli e modificarli</div>

            <div class="tab-pane fade" id="v-pills-utenti" role="tabpanel" aria-labelledby="v-pills-utenti-tab"
              tabindex="0"></div>

            <div class="tab-pane fade" id="v-pills-allenamenti" role="tabpanel"
              aria-labelledby="v-pills-allenamenti-tab" tabindex="0">Qui invece gli allenamenti</div>
          </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->

</body>

</html>