// A placeholder Google Sheet ID. Replace with the actual published sheet ID.
// The sheet must be published to the web (File -> Share -> Publish to web).
export const SHEET_ID = '1234567890abcdefghijklmnopqrstuvwxyz'; 

export async function fetchSheet(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
  
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
