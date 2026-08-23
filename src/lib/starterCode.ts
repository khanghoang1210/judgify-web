import type { ApiLanguage } from "../types/api";

/**
 * The API stores no per-problem starter code, and the judge compares stdout, so
 * every problem starts from the same stdin/stdout skeleton.
 */
export const STARTER_CODE: Record<ApiLanguage, string> = {
  PYTHON3: `import sys


def solve(data: list[str]) -> None:
    # data holds the whitespace-separated tokens read from stdin.
    print()


solve(sys.stdin.read().split())
`,
  CPP17: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Read from stdin, write the answer to stdout.

    return 0;
}
`,
};

/** CodeMirror grammar key for a backend language. */
export const EDITOR_GRAMMAR: Record<ApiLanguage, "python" | "cpp"> = {
  PYTHON3: "python",
  CPP17: "cpp",
};
