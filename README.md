# London Geometric Analysis Reading Seminar

Source files for the seminar website.

## Updating the programme

Edit [`programme.json`](programme.json). Keep the existing structure and add one object for each meeting:

```json
{
  "term": "Autumn 2026",
  "sessions": [
    {
      "date": "14 October 2026",
      "speaker": "Speaker name",
      "title": "Talk or reading title",
      "reading": "Author, paper title, Sections 1–3",
      "url": "https://example.com/paper.pdf",
      "note": "Optional additional note"
    }
  ]
}
```

The `reading`, `url`, and `note` fields are optional. Committing the edit to the `main` branch updates the published site automatically once GitHub Pages is enabled.

## Previewing locally

Run a small local server from this directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.
