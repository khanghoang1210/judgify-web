#!/usr/bin/env node
/**
 * Seeds the Judgify backend with demo data through its public/admin REST API.
 *
 * Everything that has an endpoint goes through the API (users, problems, test
 * cases, submissions). Two things have no endpoint and are done with SQL against
 * the dev MySQL container instead:
 *   - promoting the seed admin to ROLE ADMIN (register always creates USER)
 *   - backdating submissions into a judged history spread over the past weeks,
 *     which is what makes the streak, heatmap and acceptance figures look real
 *
 * Run this with the judge worker STOPPED. The worker polls every second, and it
 * would judge these submissions for real — overwriting the seeded verdicts and
 * timestamps. Once seeded, start the worker and new submissions get real verdicts.
 *
 * Usage:
 *   node scripts/seed-data.mjs            # wipe + reseed
 *   node scripts/seed-data.mjs --keep     # add to existing data
 *
 * Env: API_URL (default http://localhost:8080), MYSQL_CONTAINER (auto-detected)
 */
import { execFileSync } from "node:child_process";

const API = process.env.API_URL ?? "http://localhost:8080";
const RESET = !process.argv.includes("--keep");

const ADMIN = { username: "admin", email: "admin@judgify.dev", password: "admin1234" };
const USERS = [
  { username: "alexdev", email: "alex@judgify.dev", password: "alex12345" },
  { username: "binarywizard", email: "wizard@judgify.dev", password: "wizard1234" },
  { username: "nullpointer", email: "nullptr@judgify.dev", password: "nullptr1234" },
];

/* ------------------------------------------------------------------ helpers */

let mysqlContainer = process.env.MYSQL_CONTAINER;

function findMysqlContainer() {
  if (mysqlContainer) return mysqlContainer;
  const names = execFileSync("docker", ["ps", "--format", "{{.Names}}"], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
  mysqlContainer = names.find((n) => n.includes("mysql"));
  if (!mysqlContainer) {
    throw new Error("No running MySQL container found. Start it with `docker compose up -d`.");
  }
  return mysqlContainer;
}

function sql(statement) {
  return execFileSync(
    "docker",
    ["exec", "-i", "-e", "MYSQL_PWD=judgify", findMysqlContainer(), "mysql", "-ujudgify", "-N", "-B", "judgify", "-e", statement],
    { encoding: "utf8" },
  ).trim();
}

async function api(method, path, { body, token } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status} ${text}`);
  }
  return data;
}

/** Registers a user, or logs in if the username is already taken. */
async function ensureUser({ username, email, password }) {
  try {
    return await api("POST", "/api/v1/auth/register", { body: { username, email, password } });
  } catch (err) {
    if (!String(err.message).includes("409")) throw err;
    return api("POST", "/api/v1/auth/login", { body: { username, password } });
  }
}

const escape = (value) => `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;

/* -------------------------------------------------------------------- data */

/**
 * Problems are stdin/stdout shaped, which is what the judge engine compares.
 * `description` is Markdown — the web app renders it with a small renderer.
 */
const PROBLEMS = [
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "EASY",
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

You may assume that each input has **exactly one solution**, and you may not use the same element twice.

## Input

The first line contains two integers \`n\` and \`target\`.
The second line contains \`n\` space-separated integers.

## Output

Print the two indices in increasing order, separated by a space.

## Constraints

- \`2 <= n <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
`,
    testCases: [
      { input: "4 9\n2 7 11 15", expectedOutput: "0 1", sample: true },
      { input: "3 6\n3 2 4", expectedOutput: "1 2", sample: true },
      { input: "2 6\n3 3", expectedOutput: "0 1", sample: false },
      { input: "5 -8\n-3 4 -5 7 1", expectedOutput: "0 2", sample: false },
    ],
  },
  {
    title: "Reverse String",
    slug: "reverse-string",
    difficulty: "EASY",
    description: `Read a single line of text and print it reversed.

## Input

A single line containing a string \`s\` of printable ASCII characters.

## Output

Print \`s\` in reverse order.

## Constraints

- \`1 <= |s| <= 10^5\`
`,
    testCases: [
      { input: "hello", expectedOutput: "olleh", sample: true },
      { input: "Judgify", expectedOutput: "yfigduJ", sample: true },
      { input: "a", expectedOutput: "a", sample: false },
    ],
  },
  {
    title: "FizzBuzz",
    slug: "fizz-buzz",
    difficulty: "EASY",
    description: `Print the numbers from \`1\` to \`n\`, one per line, with two substitutions:

- multiples of 3 become \`Fizz\`
- multiples of 5 become \`Buzz\`
- multiples of both become \`FizzBuzz\`

## Input

A single integer \`n\`.

## Output

\`n\` lines following the rules above.

## Constraints

- \`1 <= n <= 10^4\`
`,
    testCases: [
      { input: "5", expectedOutput: "1\n2\nFizz\n4\nBuzz", sample: true },
      { input: "15", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz", sample: true },
      { input: "1", expectedOutput: "1", sample: false },
    ],
  },
  {
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "EASY",
    description: `Given a sorted array of distinct integers and a \`target\`, return the index of \`target\`, or \`-1\` when it is absent.

Your solution must run in \`O(log n)\` time.

## Input

The first line contains two integers \`n\` and \`target\`.
The second line contains \`n\` space-separated integers in ascending order.

## Output

Print the index of \`target\`, or \`-1\`.

## Constraints

- \`1 <= n <= 10^5\`
- \`-10^9 <= nums[i], target <= 10^9\`
`,
    testCases: [
      { input: "6 9\n-1 0 3 5 9 12", expectedOutput: "4", sample: true },
      { input: "6 2\n-1 0 3 5 9 12", expectedOutput: "-1", sample: true },
      { input: "1 5\n5", expectedOutput: "0", sample: false },
    ],
  },
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "EASY",
    description: `You are climbing a staircase with \`n\` steps. Each move takes you either 1 or 2 steps up.

Return the number of distinct ways to reach the top, modulo \`10^9 + 7\`.

## Input

A single integer \`n\`.

## Output

The number of distinct ways, modulo \`10^9 + 7\`.

## Constraints

- \`1 <= n <= 10^6\`
`,
    testCases: [
      { input: "2", expectedOutput: "2", sample: true },
      { input: "3", expectedOutput: "3", sample: true },
      { input: "10", expectedOutput: "89", sample: false },
      { input: "45", expectedOutput: "1836311903", sample: false },
    ],
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "MEDIUM",
    description: `Given a string containing only the characters \`(\`, \`)\`, \`{\`, \`}\`, \`[\` and \`]\`, decide whether it is balanced.

A string is balanced when every bracket is closed by the same type of bracket, in the correct order.

## Input

A single line containing the bracket string \`s\`.

## Output

Print \`true\` when \`s\` is balanced, otherwise \`false\`.

## Constraints

- \`1 <= |s| <= 10^4\`
`,
    testCases: [
      { input: "()", expectedOutput: "true", sample: true },
      { input: "()[]{}", expectedOutput: "true", sample: true },
      { input: "(]", expectedOutput: "false", sample: false },
      { input: "([)]", expectedOutput: "false", sample: false },
      { input: "{[]}", expectedOutput: "true", sample: false },
    ],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "MEDIUM",
    timeLimitMs: 2000,
    description: `Given a string \`s\`, return the length of the longest substring that contains no repeated characters.

## Input

A single line containing the string \`s\`.

## Output

The length of the longest substring without repeating characters.

## Constraints

- \`0 <= |s| <= 5 * 10^4\`
- \`s\` consists of English letters, digits, symbols and spaces
`,
    testCases: [
      { input: "abcabcbb", expectedOutput: "3", sample: true },
      { input: "bbbbb", expectedOutput: "1", sample: true },
      { input: "pwwkew", expectedOutput: "3", sample: false },
      { input: "dvdf", expectedOutput: "3", sample: false },
    ],
  },
  {
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: "MEDIUM",
    timeLimitMs: 2000,
    description: `Given \`n\` lowercase words, group the anagrams together.

Sort each group alphabetically, then sort the groups by their first word. Print one group per line, words separated by a single space.

## Input

The first line contains \`n\`. Each of the next \`n\` lines contains one word.

## Output

The anagram groups, one per line, ordered as described above.

## Constraints

- \`1 <= n <= 10^4\`
- \`1 <= |word| <= 100\`
`,
    testCases: [
      { input: "6\neat\ntea\ntan\nate\nnat\nbat", expectedOutput: "ate eat tea\nbat\nnat tan", sample: true },
      { input: "1\na", expectedOutput: "a", sample: true },
      { input: "3\nab\nba\nabc", expectedOutput: "ab ba\nabc", sample: false },
    ],
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "MEDIUM",
    description: `Given an integer array \`nums\`, find the contiguous subarray with the largest sum and return that sum.

## Input

The first line contains \`n\`. The second line contains \`n\` space-separated integers.

## Output

The largest subarray sum.

## Constraints

- \`1 <= n <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
`,
    testCases: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6", sample: true },
      { input: "1\n1", expectedOutput: "1", sample: true },
      { input: "5\n5 4 -1 7 8", expectedOutput: "23", sample: false },
      { input: "3\n-3 -2 -5", expectedOutput: "-2", sample: false },
    ],
  },
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "HARD",
    timeLimitMs: 2000,
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water can be trapped after raining.

## Input

The first line contains \`n\`. The second line contains \`n\` space-separated integers.

## Output

The total amount of trapped water.

## Constraints

- \`1 <= n <= 2 * 10^4\`
- \`0 <= height[i] <= 10^5\`
`,
    testCases: [
      { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", expectedOutput: "6", sample: true },
      { input: "6\n4 2 0 3 2 5", expectedOutput: "9", sample: true },
      { input: "3\n1 1 1", expectedOutput: "0", sample: false },
    ],
  },
  {
    title: "Merge K Sorted Lists",
    slug: "merge-k-sorted-lists",
    difficulty: "HARD",
    timeLimitMs: 3000,
    memoryLimitMb: 512,
    description: `You are given \`k\` sorted integer lists. Merge them into one sorted list.

## Input

The first line contains \`k\`. Each of the next \`k\` lines starts with the list length followed by that many integers in ascending order.

## Output

All values in ascending order on a single line, separated by spaces. Print an empty line when every list is empty.

## Constraints

- \`1 <= k <= 10^4\`
- total number of values \`<= 10^5\`
`,
    testCases: [
      { input: "3\n3 1 4 5\n3 1 3 4\n2 2 6", expectedOutput: "1 1 2 3 4 4 5 6", sample: true },
      { input: "1\n0", expectedOutput: "", sample: true },
      { input: "2\n2 -5 -1\n1 0", expectedOutput: "-5 -1 0", sample: false },
    ],
  },
  {
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "HARD",
    timeLimitMs: 2000,
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of sizes \`m\` and \`n\`, return the median of the combined array.

The overall run time complexity should be \`O(log (m+n))\`.

## Input

The first line contains \`m\` and \`n\`.
The second line contains \`m\` integers, the third line contains \`n\` integers. A line is empty when its array is empty.

## Output

The median, printed with exactly one decimal place.

## Constraints

- \`0 <= m, n <= 1000\`
- \`m + n >= 1\`
`,
    testCases: [
      { input: "2 1\n1 3\n2", expectedOutput: "2.0", sample: true },
      { input: "2 2\n1 2\n3 4", expectedOutput: "2.5", sample: true },
      { input: "0 1\n\n1", expectedOutput: "1.0", sample: false },
    ],
  },
];

/** Reference solutions, used as realistic submission source code. */
const SOLUTIONS = {
  "two-sum": {
    PYTHON3: `import sys

def main():
    data = sys.stdin.read().split()
    n, target = int(data[0]), int(data[1])
    nums = list(map(int, data[2:2 + n]))
    seen = {}
    for i, value in enumerate(nums):
        if target - value in seen:
            print(seen[target - value], i)
            return
        seen[value] = i

main()
`,
    CPP17: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long n, target;
    cin >> n >> target;
    unordered_map<long long, int> seen;
    for (int i = 0; i < n; ++i) {
        long long value;
        cin >> value;
        auto it = seen.find(target - value);
        if (it != seen.end()) {
            cout << it->second << " " << i << "\\n";
            return 0;
        }
        seen[value] = i;
    }
    return 0;
}
`,
  },
  "reverse-string": {
    PYTHON3: `import sys

print(sys.stdin.readline().rstrip("\\n")[::-1])
`,
  },
  "fizz-buzz": {
    PYTHON3: `n = int(input())
out = []
for i in range(1, n + 1):
    if i % 15 == 0:
        out.append("FizzBuzz")
    elif i % 3 == 0:
        out.append("Fizz")
    elif i % 5 == 0:
        out.append("Buzz")
    else:
        out.append(str(i))
print("\\n".join(out))
`,
  },
  "binary-search": {
    PYTHON3: `import sys

data = sys.stdin.read().split()
n, target = int(data[0]), int(data[1])
nums = list(map(int, data[2:2 + n]))
lo, hi = 0, n - 1
answer = -1
while lo <= hi:
    mid = (lo + hi) // 2
    if nums[mid] == target:
        answer = mid
        break
    if nums[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1
print(answer)
`,
  },
  "climbing-stairs": {
    PYTHON3: `MOD = 10 ** 9 + 7
n = int(input())
a, b = 1, 1
for _ in range(n - 1):
    a, b = b, (a + b) % MOD
print(b % MOD)
`,
  },
  "valid-parentheses": {
    PYTHON3: `s = input().strip()
pairs = {")": "(", "]": "[", "}": "{"}
stack = []
ok = True
for ch in s:
    if ch in pairs:
        if not stack or stack.pop() != pairs[ch]:
            ok = False
            break
    else:
        stack.append(ch)
print("true" if ok and not stack else "false")
`,
    CPP17: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    string stack;
    for (char ch : s) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.push_back(ch);
        } else {
            char want = ch == ')' ? '(' : ch == ']' ? '[' : '{';
            if (stack.empty() || stack.back() != want) {
                cout << "false\\n";
                return 0;
            }
            stack.pop_back();
        }
    }
    cout << (stack.empty() ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
  "longest-substring-without-repeating-characters": {
    PYTHON3: `import sys

s = sys.stdin.readline().rstrip("\\n")
last = {}
best = 0
start = 0
for i, ch in enumerate(s):
    if ch in last and last[ch] >= start:
        start = last[ch] + 1
    last[ch] = i
    best = max(best, i - start + 1)
print(best)
`,
  },
  "group-anagrams": {
    PYTHON3: `import sys
from collections import defaultdict

data = sys.stdin.read().split()
n = int(data[0])
groups = defaultdict(list)
for word in data[1:1 + n]:
    groups["".join(sorted(word))].append(word)
rows = sorted(sorted(words) for words in groups.values())
print("\\n".join(" ".join(row) for row in rows))
`,
  },
  "maximum-subarray": {
    PYTHON3: `import sys

data = sys.stdin.read().split()
n = int(data[0])
nums = list(map(int, data[1:1 + n]))
best = current = nums[0]
for value in nums[1:]:
    current = max(value, current + value)
    best = max(best, current)
print(best)
`,
  },
  "trapping-rain-water": {
    PYTHON3: `import sys

data = sys.stdin.read().split()
n = int(data[0])
height = list(map(int, data[1:1 + n]))
left, right = 0, n - 1
left_max = right_max = total = 0
while left < right:
    if height[left] < height[right]:
        left_max = max(left_max, height[left])
        total += left_max - height[left]
        left += 1
    else:
        right_max = max(right_max, height[right])
        total += right_max - height[right]
        right -= 1
print(total)
`,
  },
  "merge-k-sorted-lists": {
    PYTHON3: `import sys
import heapq

data = sys.stdin.read().split()
pos = 0
k = int(data[pos]); pos += 1
lists = []
for _ in range(k):
    length = int(data[pos]); pos += 1
    lists.append(list(map(int, data[pos:pos + length])))
    pos += length
print(" ".join(map(str, heapq.merge(*lists))))
`,
  },
  "median-of-two-sorted-arrays": {
    PYTHON3: `import sys

lines = sys.stdin.read().split("\\n")
m, n = map(int, lines[0].split())
a = list(map(int, lines[1].split())) if m else []
b = list(map(int, lines[2].split())) if n else []
merged = sorted(a + b)
mid = len(merged) // 2
median = merged[mid] if len(merged) % 2 else (merged[mid - 1] + merged[mid]) / 2
print(f"{median:.1f}")
`,
  },
};

/**
 * Submission history to seed. `verdict`/`runtimeMs`/`memoryKb`/`passed` describe the
 * judged outcome that is written with SQL after the API creates the row.
 */
const SUBMISSIONS = [
  { user: "alexdev", slug: "two-sum", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 42, memoryKb: 15772, hoursAgo: 0.05 },
  { user: "alexdev", slug: "valid-parentheses", language: "CPP17", verdict: "ACCEPTED", runtimeMs: 12, memoryKb: 7372, hoursAgo: 0.7 },
  { user: "alexdev", slug: "longest-substring-without-repeating-characters", language: "PYTHON3", verdict: "WRONG_ANSWER", runtimeMs: 61, memoryKb: 16180, passed: 2, hoursAgo: 1.2 },
  { user: "alexdev", slug: "longest-substring-without-repeating-characters", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 58, memoryKb: 16224, hoursAgo: 1 },
  { user: "alexdev", slug: "merge-k-sorted-lists", language: "PYTHON3", verdict: "TIME_LIMIT_EXCEEDED", runtimeMs: 3000, memoryKb: 41984, passed: 1, hoursAgo: 5 },
  { user: "alexdev", slug: "median-of-two-sorted-arrays", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 56, memoryKb: 10035, hoursAgo: 26 },
  { user: "alexdev", slug: "fizz-buzz", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 24, memoryKb: 14336, hoursAgo: 30 },
  { user: "alexdev", slug: "maximum-subarray", language: "PYTHON3", verdict: "RUNTIME_ERROR", errorMessage: "IndexError: list index out of range", passed: 0, hoursAgo: 49 },
  { user: "alexdev", slug: "maximum-subarray", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 71, memoryKb: 18432, hoursAgo: 48 },
  { user: "alexdev", slug: "binary-search", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 31, memoryKb: 14848, hoursAgo: 74 },
  { user: "alexdev", slug: "climbing-stairs", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 96, memoryKb: 15104, hoursAgo: 120 },
  { user: "alexdev", slug: "reverse-string", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 18, memoryKb: 14080, hoursAgo: 168 },
  { user: "alexdev", slug: "trapping-rain-water", language: "PYTHON3", verdict: "WRONG_ANSWER", runtimeMs: 48, memoryKb: 15360, passed: 1, hoursAgo: 200 },
  { user: "alexdev", slug: "group-anagrams", language: "PYTHON3", verdict: "COMPILE_ERROR", errorMessage: "SyntaxError: invalid syntax (line 7)", passed: 0, hoursAgo: 260 },
  { user: "alexdev", slug: "group-anagrams", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 88, memoryKb: 21504, hoursAgo: 258 },
  { user: "binarywizard", slug: "two-sum", language: "CPP17", verdict: "ACCEPTED", runtimeMs: 8, memoryKb: 6144, hoursAgo: 3 },
  { user: "binarywizard", slug: "trapping-rain-water", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 64, memoryKb: 17408, hoursAgo: 9 },
  { user: "binarywizard", slug: "merge-k-sorted-lists", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 412, memoryKb: 45056, hoursAgo: 22 },
  { user: "nullpointer", slug: "valid-parentheses", language: "PYTHON3", verdict: "ACCEPTED", runtimeMs: 22, memoryKb: 14336, hoursAgo: 7 },
  { user: "nullpointer", slug: "binary-search", language: "PYTHON3", verdict: "WRONG_ANSWER", runtimeMs: 27, memoryKb: 14336, passed: 1, hoursAgo: 12 },
];

/* -------------------------------------------------------------------- steps */

function wipe() {
  console.log("• wiping existing data");
  for (const table of ["submission_results", "submissions", "test_cases", "problems", "users"]) {
    sql(`DELETE FROM ${table}`);
  }
}

async function seedAdmin() {
  await ensureUser(ADMIN);
  sql(`UPDATE users SET role = 'ADMIN' WHERE username = ${escape(ADMIN.username)}`);
  // Re-login so the token carries the ADMIN role.
  const auth = await api("POST", "/api/v1/auth/login", {
    body: { username: ADMIN.username, password: ADMIN.password },
  });
  console.log(`• admin ready (${auth.username}, ${auth.role})`);
  return auth.token;
}

async function seedProblems(token) {
  const bySlug = new Map();

  for (const { testCases, ...problem } of PROBLEMS) {
    let created;
    let existing = false;
    try {
      created = await api("POST", "/api/v1/admin/problems", {
        token,
        body: { ...problem, published: true },
      });
    } catch (err) {
      // --keep runs hit the unique slug constraint; reuse the existing problem.
      if (!String(err.message).includes("409")) throw err;
      created = await api("GET", `/api/v1/problems/${problem.slug}`);
      existing = true;
    }

    let cases = await api("GET", `/api/v1/admin/problems/${created.id}/test-cases`, { token });
    if (cases.length === 0) {
      cases = [];
      for (const [index, testCase] of testCases.entries()) {
        cases.push(
          await api("POST", `/api/v1/admin/problems/${created.id}/test-cases`, {
            token,
            body: { ...testCase, orderIndex: index },
          }),
        );
      }
    }

    bySlug.set(created.slug, { ...created, testCases: cases });
    console.log(
      `• problem ${created.id} ${created.slug} (${cases.length} test cases)${existing ? " [existing]" : ""}`,
    );
  }

  return bySlug;
}

async function seedUsers() {
  const tokens = new Map();
  for (const user of USERS) {
    const auth = await ensureUser(user);
    tokens.set(user.username, auth.token);
    console.log(`• user ${auth.username}`);
  }
  return tokens;
}

async function seedSubmissions(tokens, problems) {
  let judged = 0;
  for (const entry of SUBMISSIONS) {
    const problem = problems.get(entry.slug);
    if (!problem) throw new Error(`Unknown problem slug: ${entry.slug}`);

    const solutions = SOLUTIONS[entry.slug] ?? {};
    const sourceCode = solutions[entry.language] ?? solutions.PYTHON3;
    if (!sourceCode) throw new Error(`No reference solution for ${entry.slug}`);

    const created = await api("POST", `/api/v1/problems/${problem.id}/submissions`, {
      token: tokens.get(entry.user),
      body: { language: entry.language, sourceCode },
    });

    judgeSubmission(created.id, entry, problem.testCases);
    judged += 1;
  }
  console.log(`• ${judged} submissions created and marked judged`);
}

/**
 * Writes the judged outcome the no-op worker cannot produce yet: final status,
 * metrics, timestamps and one submission_results row per test case.
 */
function judgeSubmission(submissionId, entry, testCases) {
  const accepted = entry.verdict === "ACCEPTED";
  const passed = accepted ? testCases.length : (entry.passed ?? 0);
  const createdAt = `DATE_SUB(NOW(), INTERVAL ${Math.round(entry.hoursAgo * 60)} MINUTE)`;

  sql(
    `UPDATE submissions SET
       status = ${escape(entry.verdict)},
       error_message = ${entry.errorMessage ? escape(entry.errorMessage) : "NULL"},
       execution_time_ms = ${entry.runtimeMs ?? "NULL"},
       memory_used_kb = ${entry.memoryKb ?? "NULL"},
       created_at = ${createdAt},
       judged_at = DATE_ADD(${createdAt}, INTERVAL 4 SECOND)
     WHERE id = ${submissionId}`,
  );

  if (entry.verdict === "COMPILE_ERROR") return; // nothing ran

  const rows = testCases.map((testCase, index) => {
    const ok = index < passed;
    const status = ok ? "ACCEPTED" : entry.verdict;
    const runtime = ok ? Math.max(1, Math.round((entry.runtimeMs ?? 40) * 0.8)) : entry.runtimeMs ?? "NULL";
    const memory = entry.memoryKb ?? "NULL";
    const output = ok ? escape(testCase.expectedOutput) : "NULL";
    return `(${submissionId}, ${testCase.id}, ${escape(status)}, ${runtime}, ${memory}, ${output})`;
  });

  sql(
    `INSERT INTO submission_results
       (submission_id, test_case_id, status, execution_time_ms, memory_used_kb, actual_output)
     VALUES ${rows.join(", ")}`,
  );
}

/* --------------------------------------------------------------------- main */

async function main() {
  console.log(`Seeding ${API}`);
  if (RESET) wipe();

  const adminToken = await seedAdmin();
  const problems = await seedProblems(adminToken);
  const tokens = await seedUsers();
  await seedSubmissions(tokens, problems);

  console.log("\nDone. Sign in with:");
  console.log(`  ${USERS[0].username} / ${USERS[0].password}   (demo user)`);
  console.log(`  ${ADMIN.username} / ${ADMIN.password}    (admin)`);
}

main().catch((err) => {
  console.error(`\nSeeding failed: ${err.message}`);
  process.exit(1);
});
