// Guards the /learn "budget journey" manifest: LEARN_JOURNEY must cover every
// ARTICLES key exactly once, and the flattened order must follow the journey.
// Runs under `node --test`; site.ts is imported via Node's native TS
// type-stripping (it must stay free of runtime imports for this to work).
import test from "node:test";
import assert from "node:assert/strict";
import { ARTICLES, LEARN_JOURNEY, assertJourneyCovers } from "../src/content/site.ts";

const KEYS = Object.keys(ARTICLES);

test("journey covers the real ARTICLES registry exactly", () => {
  assert.doesNotThrow(() => assertJourneyCovers(LEARN_JOURNEY, KEYS));
});

test("a key missing from the journey fails the guard by name", () => {
  const truncated = LEARN_JOURNEY.map((s) => ({
    ...s,
    articles: s.articles.filter((k) => k !== "sinkingFunds"),
  }));
  assert.throws(() => assertJourneyCovers(truncated, KEYS), /Missing: sinkingFunds/);
});

test("a key unknown to ARTICLES fails the guard by name", () => {
  const extra = [...LEARN_JOURNEY, { stage: "future", articles: ["notARealArticle"] }];
  assert.throws(() => assertJourneyCovers(extra, KEYS), /Unknown: notARealArticle/);
});

test("a duplicated key fails the guard by name", () => {
  const doubled = [...LEARN_JOURNEY, { stage: "again", articles: ["makingABudget"] }];
  assert.throws(() => assertJourneyCovers(doubled, KEYS), /Duplicated: makingABudget/);
});

test("flattened order walks the journey from primer to coach", () => {
  const flat = LEARN_JOURNEY.flatMap((s) => s.articles);
  assert.equal(flat.length, KEYS.length);
  assert.equal(flat[0], "makingABudget");
  assert.equal(flat[flat.length - 1], "aiFinancialCoach");
});
