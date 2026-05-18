// A placeholder Google Sheet ID. Replace with the actual published sheet ID.
// The sheet must be published to the web (File -> Share -> Publish to web).
export const SHEET_ID = '1IPTSpnPa9aG4_lANDLhc1NMZQAmCB6Z155UwUl0GZ1E';

export async function fetchSheet(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}&headers=1`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);?/);
    if (!jsonMatch) {
      console.warn(`Could not parse JSON from sheet: ${sheetName}`);
      return [];
    }

    const data = JSON.parse(jsonMatch[1]);
    const headers = data.table.cols.map(c => c ? c.label : '').map(h => h.trim());

    const rows = data.table.rows.map(r => {
      const rowData = {};
      r.c.forEach((cell, i) => {
        const header = headers[i];
        if (header) {
          // Fallback to value if formatted value isn't available
          rowData[header] = cell ? (cell.f ? cell.f : cell.v) : null;
        }
      });
      return rowData;
    });

    return rows;
  } catch (error) {
    console.error(`Error fetching Google Sheet "${sheetName}":`, error);
    return [];
  }
}

export function normalizeDriveLink(url) {
  if (!url) return '';
  if (url.includes('drive.google.com/file/d/')) {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
  }
  return url;
}

/**
 * Parses simple Markdown and HTML tags inside a Google Sheets cell
 * to produce safely-styled HTML for web rendering.
 * @param {string} text Raw text content from Google Sheet cell
 * @returns {string} Formatted HTML string
 */
export function parseRichText(text) {
  if (!text) return '';
  
  let html = text;

  // 1. Bold: **text** or __text__ -> <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

  // 2. Italic: *text* or _text_ -> <em>text</em>
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // 3. Markdown Links: [label](url) -> formatted anchor tag
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline; font-weight: 600;">${label}</a>`;
  });

  // 4. Standard HTML Links: <a href="url"> -> inject secure & styling attributes
  html = html.replace(/<a\s+([^>]*?)href="([^"]+)"([^>]*?)>/gi, (match, prefix, url, suffix) => {
    let attrs = '';
    if (!prefix.includes('target=') && !suffix.includes('target=')) {
      attrs += 'target="_blank" ';
    }
    if (!prefix.includes('rel=') && !suffix.includes('rel=')) {
      attrs += 'rel="noopener noreferrer" ';
    }
    if (!prefix.includes('style=') && !suffix.includes('style=')) {
      attrs += 'style="color: inherit; text-decoration: underline; font-weight: 600;" ';
    }
    return `<a ${attrs}${prefix}href="${url}"${suffix}>`;
  });

  // 5. Line Breaks: \n -> <br>
  html = html.replace(/\r?\n/g, '<br>');

  return html;
}

