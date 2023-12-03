import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const isNumber = (str: string) => str.match(/[0-9]/);

const hasAdjacentSymbol = (
  lines: string[],
  lineIndex: number,
  startIndex: number,
  endIndex: number,
) => {
  let validChars = "";
  const leftIndex = Math.max(startIndex - 1, 0);
  const rightIndex = Math.min(endIndex + 1, lines[lineIndex].length - 1);
  if (lineIndex > 0) {
    validChars += lines[lineIndex - 1].substring(leftIndex, rightIndex);
  }
  validChars += lines[lineIndex].at(leftIndex);
  validChars += lines[lineIndex].at(rightIndex - 1);
  if (lineIndex < lines.length - 1) {
    validChars += lines[lineIndex + 1].substring(leftIndex, rightIndex);
  }
  const filtered = validChars.replaceAll(".", "").replaceAll(/\d/g, "");

  return filtered.length > 0;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let sum = 0;
  input.forEach((line, lineIndex) => {
    for (let i = 0; i < line.length; i++) {
      if (isNumber(line[i])) {
        let j = i;
        while (j < line.length && isNumber(line[j])) {
          j++;
        }
        if (hasAdjacentSymbol(input, lineIndex, i, j)) {
          sum += Number(line.substring(i, j));
        }
        i = j;
      }
    }
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const maybeGears = new Map<string, number[]>();

  input.forEach((line, lineIndex) => {
    for (let i = 0; i < line.length; i++) {
      if (isNumber(line[i])) {
        let j = i;
        while (j < line.length && isNumber(line[j])) {
          j++;
        }

        const leftIndex = Math.max(i - 1, 0);
        const rightIndex = Math.min(j + 1, input[lineIndex].length - 1);
        for (
          let rowIndex = Math.max(lineIndex - 1, 0);
          rowIndex <= Math.min(lineIndex + 1, input.length - 1);
          rowIndex++
        ) {
          for (let colIndex = leftIndex; colIndex < rightIndex; colIndex++) {
            if (input[rowIndex][colIndex] === "*") {
              const key = `${rowIndex},${colIndex}`;
              const num = Number(line.substring(i, j));

              if (maybeGears.has(key)) {
                maybeGears.set(key, maybeGears.get(key).concat(num));
              } else {
                maybeGears.set(key, [num]);
              }
            }
          }
        }

        i = j;
      }
    }
  });

  let sum = 0;
  for (let numbers of maybeGears.values()) {
    if (numbers.length === 2) {
      const ratio = numbers[0] * numbers[1];
      sum += ratio;
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
