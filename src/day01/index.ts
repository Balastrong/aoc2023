import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sum = input
    .map((line) => {
      const m = line.match(/[0-9]/g);

      return Number(`${m.at(0)}${m.at(-1)}`);
    })
    .reduce((acc, curr) => acc + curr, 0);

  return sum;
};

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sum = input
    .map((line) => {
      const parsedLine = numbers.reduce((acc, curr, i) => {
        return acc.replaceAll(curr, `${curr[0]}${i + 1}${curr.at(-1)}`);
      }, line);

      const m = parsedLine.match(
        /([0-9]|one|two|three|four|five|six|seven|eight|nine)/g,
      );

      return Number(`${m.at(0)}${m.at(-1)}`);
    })
    .reduce((acc, curr) => acc + curr, 0);

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
