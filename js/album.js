listAlbum();

async function listAlbum() {
  const listAlbums = document.querySelector(".albums-list");
  const listData = document.createElement("div");

  const response = await fetch("/js/data.json");
  const list = await response.json();
  listAlbums.innerHTML = list.data.map(allData);
}

const allData = data => {
  `
  <div class="row">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <img src="${data.img}">
          <span class="card-title">${data.judul}</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
        </div>

      </div>
    </div>
  </div>
  `;
};
