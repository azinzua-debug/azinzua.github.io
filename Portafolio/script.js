document.addEventListener("DOMContentLoaded", () => {

  /* ================== TEMA CLARO / OSCURO ================== */
  const btn = document.getElementById("themeToggle");

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    if (btn) btn.textContent = "☀️";
  }

  if (btn) {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("light");

      const isLight = document.body.classList.contains("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      btn.textContent = isLight ? "☀️" : "🌙";
    });
  }

  /* ================== CARGA DE CONTENIDO ================== */
  const page = document.body.dataset.page || "home";
  const jsonPath = page === "home" ? "data.json" : "../data.json";

  fetch(jsonPath)
    .then(r => r.json())
    .then(data => {
      const container = document.getElementById("content");
      if (!container) return;

      if (page === "productos") {
        data.productos.forEach(p => {
          container.innerHTML += `
            <div class="card">
              <img src="../${p.imagen}">
              <h2>${p.titulo}</h2>
              <p>${p.descripcion}</p>
              <strong>${p.precio}</strong>
            </div>
          `;
        });
      }

      if (page === "mensajes") {
        data.mensajes.forEach(m => {
          container.innerHTML += `
            <div class="card">${m.texto}</div>
          `;
        });
      }

      if (page === "proceso") {
        container.innerHTML += `
          <div class="card">
            <ol>
              ${data.proceso.map(p => `<li>${p}</li>`).join("")}
            </ol>
          </div>
        `;
      }

      if (page === "redes") {
        container.innerHTML += `
          <div class="card">
            ${Object.entries(data.redes)
              .map(([k,v]) => `<a href="${v}" target="_blank">${k}</a>`)
              .join("<br>")}
          </div>
        `;
      }
    })
    .catch(err => console.error("Error cargando JSON:", err));
});
