fetch("/mountian-range/mountian-range.json")
  .then((res) => res.json())
  .then((mountains) => {
    const container = document.getElementById("mountain-list");

    mountains.forEach((mountain) => {
      container.innerHTML += `
        <div class="mountain-card"
          data-province="${mountain.province}">
          
          <h2>${mountain.name}</h2>

          <p>지역: ${mountain.province}</p>

          <p>소재지: ${mountain.location}</p>
        </div>
      `;
    });
  });

// 지역 필터
function filterRegion(region1) {
  const cards = document.querySelectorAll(".mountain-card");

  cards.forEach((card) => {
    const province = card.dataset.province;

    if (region1 === "all" || province === region1) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
