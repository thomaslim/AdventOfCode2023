const fs = require("fs");

const puzzleInput = fs.readFileSync("19/input.txt").toString("utf-8").trim();

function parseWorkflow(inputString) {
  const workflowName = inputString.match(/(\w*){/)
    ? inputString.match(/(\w*){/)[1]
    : "";
  const instructions1 = inputString.match(/{(.*)}/);
  const instructions2 = instructions1[1].split(",");
  const instructions3 = instructions2.map((item, index) => {
    if (index === instructions2.length - 1) return { next: item };
    const params = item.match(/(\w)([<>])(\d*):(\w*)/);
    return {
      next: params[4],
      key: params[1],
      func: params[2],
      threshold: params[3],
    };
  });

  return { name: workflowName, instructions: instructions3 };
}

function parsePart(inputString) {
  const replaceSpaces = inputString
    .replace(/=/g, ":")
    .replace(/(\w):/g, '"$1":');

  return JSON.parse(replaceSpaces);
}

function parseDataSet(inputString) {
  const sections = inputString.split("\n\n");
  const workflows = sections[0].split("\n").map(parseWorkflow);
  const parts = sections[1].split("\n").map(parsePart);
  return { workflows, parts };
}

function runWorkfowOnPart(part, workflows, workflowName = "in") {
  const workflow = workflows.find((item) => item.name === workflowName);
  // eslint-disable-next-line no-restricted-syntax
  for (const instruction of workflow.instructions) {
    if (!instruction.func) return instruction.next;
    if (
      instruction.func === "<" &&
      part[instruction.key] < instruction.threshold
    )
      return instruction.next;
    if (
      instruction.func === ">" &&
      part[instruction.key] > instruction.threshold
    )
      return instruction.next;
  }

  return false;
}

function runProcessOnPart(part, workflows) {
  let next = "in";
  while (next !== "A" && next !== "R") {
    next = runWorkfowOnPart(part, workflows, next);
  }
  return next;
}

function processAllParts(parts, workflows) {
  return parts.reduce((acc, item) => {
    const processResult = runProcessOnPart(item, workflows);
    return processResult === "A"
      ? acc + item.x + item.m + item.a + item.s
      : acc;
  }, 0);
}

const demoSet = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;

test("parse workflow string", () => {
  expect(parseWorkflow("px{a<2006:qkq,m>2090:A,rfg}")).toEqual({
    name: "px",
    instructions: [
      { func: "<", key: "a", next: "qkq", threshold: "2006" },
      { func: ">", key: "m", next: "A", threshold: "2090" },
      { next: "rfg" },
    ],
  });
  expect(parseWorkflow("in{s<1351:px,qqz}")).toEqual({
    name: "in",
    instructions: [
      { func: "<", key: "s", next: "px", threshold: "1351" },
      { next: "qqz" },
    ],
  });
  expect(parseWorkflow("bgt{a<1575:R,s<3923:fbv,s<3953:A,pdj}")).toEqual({
    name: "bgt",
    instructions: [
      { func: "<", key: "a", next: "R", threshold: "1575" },
      { func: "<", key: "s", next: "fbv", threshold: "3923" },
      { func: "<", key: "s", next: "A", threshold: "3953" },
      { next: "pdj" },
    ],
  });
});

test("parse part string", () => {
  expect(parsePart("{x=787,m=2655,a=1222,s=2876}")).toEqual({
    x: 787,
    m: 2655,
    a: 1222,
    s: 2876,
  });
});

test("parse data set", () => {
  const parsedData = parseDataSet(demoSet);
  expect(Array.isArray(parsedData.parts)).toEqual(true);
  expect(parsedData.parts).toHaveLength(5);
  expect(parsedData.workflows).toHaveLength(11);
});

test("Run workflows", () => {
  const parsedData = parseDataSet(demoSet);
  expect(
    runWorkfowOnPart(
      {
        x: 787,
        m: 2655,
        a: 1222,
        s: 2876,
      },
      parsedData.workflows,
    ),
  ).toEqual("qqz");
  expect(
    runWorkfowOnPart(
      {
        x: 787,
        m: 2655,
        a: 1222,
        s: 2876,
      },
      parsedData.workflows,
      "qqz",
    ),
  ).toEqual("qs");
  expect(
    runWorkfowOnPart(
      {
        x: 787,
        m: 2655,
        a: 1222,
        s: 2876,
      },
      parsedData.workflows,
      "qs",
    ),
  ).toEqual("lnx");
  expect(
    runWorkfowOnPart(
      {
        x: 787,
        m: 2655,
        a: 1222,
        s: 2876,
      },
      parsedData.workflows,
      "lnx",
    ),
  ).toEqual("A");
});

test("Run process on 1 part", () => {
  const parsedData = parseDataSet(demoSet);
  expect(
    runProcessOnPart(
      { x: 787, m: 2655, a: 1222, s: 2876 },
      parsedData.workflows,
    ),
  ).toEqual("A");
  expect(
    runProcessOnPart({ x: 1679, m: 44, a: 2067, s: 496 }, parsedData.workflows),
  ).toEqual("R");
  expect(
    runProcessOnPart({ x: 2036, m: 264, a: 79, s: 2244 }, parsedData.workflows),
  ).toEqual("A");
  expect(
    runProcessOnPart(
      { x: 2461, m: 1339, a: 466, s: 291 },
      parsedData.workflows,
    ),
  ).toEqual("R");
  expect(
    runProcessOnPart(
      { x: 2127, m: 1623, a: 2188, s: 1013 },
      parsedData.workflows,
    ),
  ).toEqual("A");
});

test("Run process on demo set", () => {
  const parsedData = parseDataSet(demoSet);
  expect(processAllParts(parsedData.parts, parsedData.workflows)).toEqual(
    19114,
  );
});

test("Run process for puzzle data", () => {
  const parsedData = parseDataSet(puzzleInput);
  expect(processAllParts(parsedData.parts, parsedData.workflows)).toEqual(
    398527,
  );
});
