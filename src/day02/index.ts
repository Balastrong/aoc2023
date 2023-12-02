import run from "aocrunner";

const max = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

// const getColor= (rawColor: string, color: keyof typeof max) => {
//   const value = rawColor.match(/(\d*) color/g)
// }

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [game, rawDraws] = line.split(":");
    const gameId = game.split("Game ")[1];

    const numbers = rawDraws.split(";").map((draw) => ({
      red: Number(draw.match(/(\d*) red/)?.[1]),
      blue: Number(draw.match(/(\d*) blue/)?.[1]),
      green: Number(draw.match(/(\d*) green/)?.[1]),
    }));

    return {
      id: Number(gameId),
      numbers,
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sum = input
    .filter((game) => {
      return game.numbers.every((numbers) =>
        Object.entries(max).every(
          ([k, v]) => isNaN(numbers[k]) || numbers[k] <= v,
        ),
      );
    })
    .reduce((acc, curr) => curr.id + acc, 0);

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sum = input
    .map(({ numbers }) => {
      //console.log(numbers);
      const mins = numbers.reduce(
        (acc, curr) => {
          Object.entries(curr).forEach(([k, v]) => {
            if (!isNaN(v)) {
              console.log(v);
              acc[k] = Math.max(acc[k], v);
            }
          });
          return acc;
        },
        {
          red: 0,
          green: 0,
          blue: 0,
        },
      );
      const pow = Object.values(mins).reduce(
        (acc, curr) => acc * (isNaN(curr) ? 1 : curr),
        1,
      );
      console.log(mins, pow);
      return pow;
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
