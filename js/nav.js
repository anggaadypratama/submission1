document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    fetch("nav.html").then(response => response.text()).then(responseText => {
      document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
        elm.innerHTML = responseText;
      });

      document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", event => {
          const sidenav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenav).close();

          page = event.target.getAttribute("href").substr(1);
          loadPage(page);
        });
      });
    });
  }

  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    fetch(`pages/${page}.html`)
      .then(response => {
        let txt;
        console.log(response.status);
        response.status == 200
          ? (txt = response.text())
          : response.status == 404
            ? (txt = `<p class="text-center">Halaman tidak ditemukan</p>`)
            : (txt = `<p class="text-center">Ups.. halaman tidak dapat diakses.</p>`);
        return txt;
      })
      .then(responseText => {
        let content = document.querySelector("#body-content");
        content.innerHTML = responseText;
      });
  }
});
