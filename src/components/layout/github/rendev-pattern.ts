const FONT_5X7: Record<string, string[]> = {
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  N: ["10001", "11001", "10101", "10101", "10011", "10001", "10001"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
};

const WORD = "RENDEV";
const LETTER_SPACING = 1;

function buildPattern(): number[][] {
  const rows: string[] = Array.from({ length: 7 }, () => "");

  [...WORD].forEach((ch, i) => {
    const letter = FONT_5X7[ch];
    for (let r = 0; r < 7; r++) rows[r] += letter[r];
    if (i !== WORD.length - 1) {
      for (let r = 0; r < 7; r++) rows[r] += "0".repeat(LETTER_SPACING);
    }
  });

  const cols = rows[0].length;
  const padding = 2;

  const intensityCycle = [2, 4, 3, 4];
  let onColCount = 0;

  const weeks: number[][] = [];

  for (let c = -padding; c < cols + padding; c++) {
    const week: number[] = [];
    const isPaddingCol = c < 0 || c >= cols;
    if (!isPaddingCol) onColCount++;

    for (let r = 0; r < 7; r++) {
      if (isPaddingCol) {
        week.push(0);
      } else {
        const on = rows[r][c] === "1";
        week.push(on ? intensityCycle[onColCount % intensityCycle.length] : 0);
      }
    }
    weeks.push(week);
  }

  return weeks;
}

export const RENDEV_PATTERN: number[][] = buildPattern();
