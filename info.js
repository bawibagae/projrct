let allMountains = [];
let currentMountains = [];

function filterRegion() {}
function handleSort() {}
function searchMountain() {}

fetch("/mountains/mountains.json")
  .then((res) => res.json())
  .then((mountains) => {
    allMountains = sortByName(mountains);
    currentMountains = [...allMountains];
    renderMountains(currentMountains);
  });

/* 정렬을 합시다~! */
function sortByName(arr) {
  return [...arr].sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

/* 렌더용 코드 */
function renderMountains(mountains) {
  const container = document.getElementById("mountain-list");

  let html = "";

  mountains.forEach((mountain) => {
    html += `
      <div class="mountain-card"
        data-province="${mountain.province}">

        <h2>${mountain.name}</h2>

        <p>지역: ${mountain.province}</p>

        <p>소재지: ${mountain.location}</p>

        <p>높이: ${mountain.height}m</p>
      </div>
    `;
  });

  container.innerHTML = html;
}

/* 지역 필터에 관한 코드임  */
function filterRegion(region1) {
  let filtered;

  if (region1 === "all") {
    filtered = [...allMountains];
  } else {
    filtered = allMountains.filter((mountain) => mountain.province === region1);
  }

  currentMountains = sortByName(filtered);
  renderMountains(currentMountains);
}

/* 검색을 해봅시다ㅏㅏ  */
function searchMountain(keyword) {
  keyword = keyword.trim();

  if (!keyword) {
    currentMountains = sortByName(allMountains);
    renderMountains(currentMountains);
    return;
  }

  const filtered = allMountains.filter(
    (mountain) =>
      mountain.name.includes(keyword) ||
      mountain.location.includes(keyword) ||
      mountain.province.includes(keyword),
  );

  currentMountains = sortByName(filtered);
  renderMountains(currentMountains);
}

/* 높이 낮은 순으로 정렬해줍니다? */
function sortHeightAsc() {
  currentMountains = [...allMountains].sort(
    (a, b) => Number(a.height) - Number(b.height),
  );

  renderMountains(currentMountains);
}
/* 높이 높은 순으로도 해볼까요? */
function sortHeightDesc() {
  currentMountains = [...allMountains].sort(
    (a, b) => Number(b.height) - Number(a.height),
  );

  renderMountains(currentMountains);
}

/* 높이 범위 필터입니당 */
function filterHeightRange(min, max) {
  const filtered = currentMountains.filter((mountain) => {
    const height = Number(mountain.height);
    return height >= min && height <= max;
  });

  currentMountains = sortByName(filtered);
  renderMountains(currentMountains);
}

function handleSort(value) {
  if (value === "asc") {
    sortHeightAsc();
  } else if (value === "desc") {
    sortHeightDesc();
  }
}

/* 검색창 드뎌 js코드 작성끄읏! */
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchMountain(e.target.value);
    }
  });
});
