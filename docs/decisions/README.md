# Decision journal

This folder is InsideTheBlueDot's running record of non-trivial technical decisions —
what was decided, why, what tradeoffs were accepted, and (per the project's working
constitution) whether any new dependency or third-party tooling was introduced and why.

## Conventions

- One file per decision: `NNNN-short-title.md`, numbered sequentially.
- A decision is logged when it's proposed, and updated with the outcome once approved,
  denied, or superseded — denials are logged too, without needing to be re-argued.
- Every entry states plainly whether it adds a dependency (a library, a CI action, an
  external service) and, if so, why the built-in/no-dependency option wasn't enough.

## Index

- [0001 — Deploy automation and journal](0001-deploy-automation-and-journal.md)
