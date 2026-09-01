# 0001 — Deploy automation and decision journal

- **Status:** Approved (2026-09-01), on `dev`, pending merge to `main`
- **Proposed:** 2026-08-25
- **Approved:** 2026-09-01

## What

Two things, bundled because they landed together:

1. This decision journal itself (`docs/decisions/`), so future proposals have a
   permanent, in-repo record instead of living only in chat history.
2. `.github/workflows/deploy.yml` — a GitHub Actions workflow that publishes the
   site to GitHub Pages automatically on every push to `main`.

## Why

The site currently deploys from Pages' "Deploy from a branch" mode, which builds
directly from whatever is on `main` with no visible build step and no history of
individual deploys. Moving to an Actions-based deploy gives an explicit,
inspectable pipeline (each deploy is a logged workflow run) without changing what
gets published — same static files, same output.

## Dependencies introduced

Per the project constitution's external-tooling gate, every dependency gets
flagged here, including first-party ones.

Four GitHub-maintained Actions, all under the `actions/` org:

- `actions/checkout@v4` — checks out the repo into the runner.
- `actions/configure-pages@v5` — detects and configures the Pages deployment target.
- `actions/upload-pages-artifact@v3` — packages the site directory as a Pages artifact.
- `actions/deploy-pages@v4` — publishes that artifact to Pages.

**Why these clear the bar:** all four are authored and maintained by GitHub itself
(not a third-party community action), open source, in wide use across GitHub's own
documentation and the broader ecosystem for exactly this purpose, and pinned to
major-version tags that GitHub maintains. They add no runtime dependency to the
site itself — they only run in CI to move already-static files into place.

**Why not skip Actions entirely:** GitHub Pages' branch-deploy mode can't be
triggered by anything except a push and gives no per-deploy log; an Actions
workflow is the minimal built-in mechanism GitHub itself provides for an
inspectable deploy pipeline, without reaching for a third-party CI or hosting
service (Netlify, Vercel, etc.) per the constitution's dependency-minimalism rule.

## Tradeoffs

- Adds a small amount of CI-config surface area to maintain (a ~30-line workflow
  file) versus the zero-config branch-deploy mode.
- Requires the repo's Pages source to be switched from "Deploy from a branch" to
  "GitHub Actions" in repo settings (Settings → Pages → Build and deployment).
- Workflow runs use GitHub-hosted Actions runners, which is itself a GitHub-operated
  service the repo now depends on for deploys (same trust boundary as Pages hosting
  itself, so treated as no additional exposure).

## Branching note

Per the constitution, this lands on `dev` first. It merges to `main` (and starts
actually deploying) only once tested and approved by both Manuel and Claude, per
the standard review workflow — not automatically as part of this commit.
