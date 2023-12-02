import run from "aocrunner";

const max = {
  red: 12,
  green: 13,
  blue: 14,
};

type Draw = typeof max;

const getColor = (rawColor: string, color: keyof typeof max) => {
  const regex = new RegExp(`(\\d*) ${color}`);
  const num = Number(regex.exec(rawColor)?.[1]);

  return isNaN(num) ? 0 : num;
};

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [game, rawDraws] = line.split(":");
    const gameId = game.match(/(\d+)/)[0];

    const numbers = rawDraws.split(";").map((draw) =>
      Object.keys(max).reduce((acc, k) => {
        acc[k] = getColor(draw, k as keyof Draw);
        return acc;
      }, {} as Draw),
    );

    return {
      id: Number(gameId),
      numbers,
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sum = input
    .filter((game) =>
      game.numbers.every((numbers) =>
        Object.entries(max).every(([k, v]) => numbers[k] <= v),
      ),
    )
    .reduce((acc, curr) => curr.id + acc, 0);

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sum = input
    .map(({ numbers }) => {
      const mins = numbers.reduce(
        (acc, curr) => {
          Object.entries(curr).forEach(([k, v]) => {
            acc[k] = Math.max(acc[k], v);
          });
          return acc;
        },
        {
          red: 0,
          green: 0,
          blue: 0,
        },
      );

      return Object.values(mins).reduce((acc, curr) => acc * curr, 1);
    })
    .reduce((acc, curr) => curr + acc, 0);

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
