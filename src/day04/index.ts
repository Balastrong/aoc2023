import run from "aocrunner";

type Card = {
  cardNumber: number;
  winners: Set<number>;
  card: number[];
  winningCount: number;
};

const parseInput = (rawInput: string): Card[] =>
  rawInput.split("\n").map((line, i) => {
    const game = line.split(":")[1];
    const [rawWinners, rawCard] = game.split("|");
    const winners = new Set(rawWinners.match(/\d+/g).map(Number));
    const card = rawCard.match(/\d+/g).map(Number);

    const winningCount = card.filter((c) => winners.has(c)).length;

    return {
      cardNumber: Number(i + 1),
      winners,
      card,
      winningCount,
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const points = input.map(({ winningCount }) =>
    winningCount > 0 ? Math.pow(2, winningCount) / 2 : 0,
  );

  return points.reduce((a, b) => a + b, 0);
};

const part2 = (rawInput: string) => {
  let input = parseInput(rawInput);

  for (let i = 0; i < input.length; i++) {
    const { cardNumber, winningCount } = input[i];
    if (winningCount > 0) {
      input.push(...input.slice(cardNumber, cardNumber + winningCount));
    }
  }

  return input.length;
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
