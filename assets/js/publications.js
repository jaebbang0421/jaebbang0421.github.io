// Renders /assets/data/publications.json into the publications page.
(async function () {
  const root = document.getElementById("pubs");
  if (!root) return;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const LINK_LABELS = { pdf: "PDF", doi: "DOI", paper: "Paper", code: "Code", project: "Project", slides: "Slides", poster: "Poster", video: "Video" };

  let data;
  try {
    const res = await fetch("/assets/data/publications.json", { cache: "no-cache" });
    data = await res.json();
  } catch (e) {
    root.innerHTML = '<p class="page-lead">Could not load the publication list.</p>';
    return;
  }
  const me = new Set(data.me || []);

  // group: entries with a status (e.g. "Under review") first, then by year (newest first)
  const groups = new Map();
  data.publications.forEach((p) => {
    const key = p.status || String(p.year);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  });
  const keys = [...groups.keys()].sort((a, b) => {
    const na = Number(a), nb = Number(b);
    if (isNaN(na) && !isNaN(nb)) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    return nb - na;
  });

  root.innerHTML = keys.map((k) => `
    <h2 class="year">${esc(k)}</h2>
    ${groups.get(k).map(card).join("")}`).join("");

  function card(p) {
    const authors = p.authors.map((a) => (me.has(a) ? `<span class="me">${esc(a)}</span>` : esc(a))).join(", ");
    const thumb = p.thumb
      ? `<div class="pub__thumb"><img src="${esc(p.thumb)}" alt="" loading="lazy" /></div>`
      : `<div class="pub__thumb pub__thumb--empty">${esc(p.abbr || "")}</div>`;
    const links = Object.entries(p.links || {})
      .filter(([, url]) => url)
      .map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(LINK_LABELS[k] || k)}</a>`)
      .join("");
    // journals show only their index badge (SCIE, KCI); posters show a plain "Poster" pill
    const typePill = /Journal$/.test(p.type) ? null : /Poster$/.test(p.type) ? "Poster" : p.type;
    const pills = [typePill, p.badge].filter(Boolean).map((x) => `<span class="pill">${esc(x)}</span>`).join("");
    return `
      <article class="pub" id="${esc(p.id)}">
        ${thumb}
        <div>
          <p class="pub__title">${esc(p.title)}</p>
          <p class="pub__authors">${authors}</p>
          <p class="pub__venue">${esc(p.venue)}${p.year && !p.status ? `, ${p.year}` : ""} ${pills}</p>
          ${links ? `<div class="pub__links">${links}</div>` : ""}
        </div>
      </article>`;
  }
})();
