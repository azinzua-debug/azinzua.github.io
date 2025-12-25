fetch("../data.json")
  .then(r => r.json())
  .then(data => {
    const page = document.body.dataset.page;
    const container = document.getElementById("content");

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
          <div class="card">
            <p>${m.texto}</p>
          </div>
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
            .map(([k,v]) => `<a href="${v}">${k}</a>`)
            .join("<br>")}
        </div>
      `;
    }
  });
