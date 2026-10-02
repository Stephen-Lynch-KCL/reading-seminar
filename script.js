function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function makeSession(session) {
  const article = makeElement("article", "session");
  const date = makeElement("div", "session-date", session.date || "Date to follow");
  const speaker = makeElement("div", "session-speaker", session.speaker || "Speaker to follow");
  const main = makeElement("div", "session-main");
  const title = makeElement("h3", "session-title", session.title || "Title to follow");

  main.append(title);

  if (session.reading) {
    const reading = makeElement("p", "session-reading");
    reading.append("Reading: ");

    if (session.url) {
      const link = makeElement("a", "", session.reading);
      link.href = session.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      reading.append(link);
    } else {
      reading.append(session.reading);
    }

    main.append(reading);
  }

  if (session.note) main.append(makeElement("p", "session-note", session.note));

  article.append(date, speaker, main);
  return article;
}

async function loadProgramme() {
  const list = document.querySelector("#programme-list");
  const term = document.querySelector("#programme-term");

  try {
    const response = await fetch("programme.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Programme request failed: ${response.status}`);

    const programme = await response.json();
    if (!Array.isArray(programme.sessions) || programme.sessions.length === 0) return;

    if (programme.term) {
      term.textContent = programme.term;
      term.hidden = false;
    }

    list.replaceChildren(...programme.sessions.map(makeSession));
  } catch (error) {
    console.warn("The programme could not be loaded.", error);
  }
}

document.querySelector("#year").textContent = new Date().getFullYear();
loadProgramme();
