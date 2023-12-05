import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const [seeds, ...groups] = rawInput.split("\n\n");

  const maps = groups.map((group) => {
    const [, ...lines] = group.split("\n");
    const l = lines.map((l) => {
      const s = l.split(" ");
      return {
        destination: +s[0],
        source: +s[1],
        length: +s[2],
      };
    });

    l.sort((a, b) => a.source - b.source);

    return l;
  });

  return {
    seeds: seeds
      .split(" ")
      .map((s) => +s)
      .splice(1),
    maps,
  };
};

const part1 = (rawInput: string) => {
  const { seeds, maps } = parseInput(rawInput);

  const locations = seeds.map((initialSeed) => {
    return maps.reduce((seed, map, idx) => {
      if (
        seed < map[0].source ||
        seed > map.at(-1).source + map.at(-1).length
      ) {
        //console.log(idx, "A", seed, map);
        return seed;
      }
      for (let i = 0; i < map.length; i++) {
        const currentMap = map[i];
        if (
          seed >= currentMap.source &&
          seed < currentMap.source + currentMap.length
        ) {
          const newSeed = seed + currentMap.destination - currentMap.source;
          //console.log(idx, "B", seed, currentMap);
          return newSeed;
        }
      }
      //console.log(idx, "C", seed);
      return seed;
    }, initialSeed);
  });

  return Math.min(...locations);
};

const part2 = (rawInput: string) => {
  console.log("");
  const { seeds, maps } = parseInput(rawInput);
  let ranges: number[][] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    ranges.push([seeds[i], seeds[i] + seeds[i + 1]]);
  }

  const tested = new Set<number>();

  const locations = ranges.map(([start, end]) => {
    let minSeed = Number.MAX_SAFE_INTEGER;

    for (let s = start; s < end; s++) {
      if (tested.has(s)) continue;

      const newMin = maps.reduce((seed, map, idx) => {
        if (
          seed < map[0].source ||
          seed >= map.at(-1).source + map.at(-1).length
        ) {
          //console.log(idx, "A", seed, map);
          return seed;
        }
        for (let i = 0; i < map.length; i++) {
          const currentMap = map[i];
          if (
            seed >= currentMap.source &&
            seed < currentMap.source + currentMap.length
          ) {
            const newSeed = seed + currentMap.destination - currentMap.source;
            //console.log(idx, "B", seed, currentMap);
            return newSeed;
          }
        }
        //console.log(idx, "C", seed);
        console.log("X");
        return seed;
      }, s);

      //console.log(s);
      tested.add(s);
      minSeed = Math.min(minSeed, newMin);
    }
    return minSeed;
  });

  return Math.min(...locations);
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
