import type { ProblemDetail } from "../types/problemDetail";

export const problemDetail: ProblemDetail = {
  id: 146,
  number: 146,
  title: "LRU Cache",
  difficulty: "Hard",
  intro:
    "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
  methodsIntro: "Implement the LRUCache class:",
  methods: [
    {
      signature: "LRUCache(int capacity)",
      description: "Initialize the LRU cache with positive size capacity.",
    },
    {
      signature: "int get(int key)",
      description:
        "Return the value of the key if the key exists, otherwise return -1.",
    },
    {
      signature: "void put(int key, int value)",
      description:
        "Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.",
    },
  ],
  example: {
    input: [
      '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]',
      "[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]",
    ],
    output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
    explanation: [
      "LRUCache lRUCache = new LRUCache(2);",
      "lRUCache.put(1, 1); // cache is {1=1}",
      "lRUCache.put(2, 2); // cache is {1=1, 2=2}",
      "lRUCache.get(1);    // return 1",
      "lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}",
    ],
  },
  constraints: [
    "1 <= capacity <= 3000",
    "0 <= key <= 10^4",
    "0 <= value <= 10^5",
    "At most 2 * 10^5 calls will be made to get and put.",
  ],
  languages: [
    { label: "C++", value: "cpp" },
    { label: "Java", value: "java" },
    { label: "Python 3", value: "python" },
    { label: "Swift", value: "swift" },
  ],
  starterCode: `class LRUCache:

    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        # TODO: Initialize doubly linked list

    def get(self, key: int) -> int:
        if key in self.cache:
            # Update recent usage
            return self.cache[key]
        return -1

    def put(self, key: int, value: int) -> None:
        # Logic for LRU eviction
        pass`,
  testCases: [
    {
      name: "Case 1",
      methods:
        '["LRUCache","put","put","get","put","get","put","get","get","get"]',
      args: "[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]",
    },
    {
      name: "Case 2",
      methods: '["LRUCache","put","get","put","get"]',
      args: "[[1],[1,1],[1],[2,2],[1]]",
    },
    {
      name: "Case 3",
      methods: '["LRUCache","put","put","get","get"]',
      args: "[[2],[2,1],[2,2],[2],[1]]",
    },
  ],
};
