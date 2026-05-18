const fs = require("fs");
const path = require("path");

function loadArray(file, varName) {
  const vm = require("vm");
  let code = fs.readFileSync(file, "utf8");
  code = code.replace(new RegExp(`const ${varName}`), `var ${varName}`);
  code = code.replace(/window\.\w+\s*=\s*\w+;?/g, "");
  const sandbox = { exports: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox[varName];
}

const scenarios = loadArray(
  path.join(__dirname, "assets/js/scenarios.js"),
  "scenarioQuestions"
);
const mock = loadArray(
  path.join(__dirname, "assets/js/mocktest.js"),
  "mockTestQuestions"
);

function cleanAnswer(a) {
  if (!a) return "";
  let s = a.replace(/\s+/g, " ").trim();
  if (/illustrative|historically emphasised closure/i.test(s)) {
    const cut = s.split(/\billustrative\b/i)[0].trim();
    if (cut.length > 40) s = cut;
  }
  if (s.length > 600) s = s.slice(0, 597) + "...";
  return s;
}

const out = {
  scenarios: scenarios.map((s) => ({
    topic: s.topic,
    title: s.title,
    context: s.context,
    questions: s.questions.map((q) => ({
      q: q.q,
      a: cleanAnswer(q.a),
      points: (q.points || []).slice(0, 4),
    })),
  })),
  mock: mock.map((m) => ({
    number: m.number,
    topic: m.topic,
    title: m.title,
    context: m.context,
    questions: m.questions.map((q) => ({
      q: q.q,
      a: cleanAnswer(q.a),
      points: (q.points || []).slice(0, 5),
    })),
  })),
};

fs.writeFileSync(
  path.join(__dirname, "exam_scenarios_export.json"),
  JSON.stringify(out, null, 2),
  "utf8"
);
console.log(
  "Exported",
  out.scenarios.length,
  "scenarios,",
  out.mock.length,
  "mock questions"
);
