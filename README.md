# Commemorate

Commemorate is an independent feature concept for Instagram. When someone posts sincerely about losing a loved one, **Like** can feel wrong. This prototype explores changing the interaction to **Commemorate** only when several high-confidence memorial signals agree. It is not affiliated with or endorsed by Meta or Instagram.

## Intended Demo

> Someone posts that a loved one has died. Why does the button still say Like?

Run the guided four-post demo to see a normal post remain **Like**, a sincere family memorial become **Commemorate**, figurative “RIP my GPA” language remain **Like**, and uncertain remembrance language trigger a private author choice.

## Architecture

- Next.js App Router, TypeScript, React, and Tailwind CSS
- Structured local fixtures in `data/`
- Replaceable local classifier in `lib/classifier.ts`
- Computed 64-case evaluation in `lib/evaluation.ts`
- No database, authentication, or API key required

## Classification

The local heuristic classifier combines explicit personal-loss statements, close relationship or pet references, grief/remembrance language, and negative context signals. Fiction, news, academic discussion, slang, humor, and figurative phrases reduce the score. Multiple positive signals are required before the public interaction changes. Borderline language remains Like and may surface the simulated author-only confirmation.

False-positive prevention matters because an incorrect memorial interaction could be painful or alarming. The evaluation page calculates accuracy, memorial precision/recall, false positives, false negatives, and the false-positive rate from the actual classifier every time it renders.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Limitations

This is an independent feature demonstration, not an Instagram integration or a factual death-verification system. Its local rules are intentionally legible and conservative but cannot capture every language, culture, euphemism, or adversarial phrasing. Demo photos are remotely hosted and require an internet connection.

## How a real implementation would differ

A production implementation would use consent-aware platform signals, multilingual models, broad cultural review, adversarial and longitudinal evaluation, privacy review, calibrated thresholds, author controls, reversible decisions, monitoring, and human escalation. The classifier would decide interaction wording—not assert that a real-world death occurred.
