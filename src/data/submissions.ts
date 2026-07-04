import type { SubmissionResult } from "../types/submission";
import type { SubmissionListItem } from "../types/submission";

export const submissionResult: SubmissionResult = {
  id: 827192,
  problemId: 173,
  problemTitle: "Binary Search Tree Iterator",
  verdict: "Accepted",
  language: "Python3",
  fileName: "solution.py",
  submittedAgo: "2 mins ago",
  testCasesPassed: 48,
  testCasesTotal: 48,
  runtime: { label: "Runtime", value: "42ms", beats: 89 },
  memory: { label: "Memory Usage", value: "15.4MB", beats: 72 },
  code: `class BSTIterator:
    def __init__(self, root: Optional[TreeNode]):
        # Initializing the stack to store nodes for in-order traversal
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        # Get the top element from stack and push its right children
        node = self.stack.pop()
        if node.right:
            self._push_left(node.right)
        return node.val

    def hasNext(self) -> bool:
        return len(self.stack) > 0

# Example usage:
# obj = BSTIterator(root)
# param_1 = obj.next()
# param_2 = obj.hasNext()`,
  timeLimit: "1.00s",
  memoryLimit: "256MB",
  rankUpTitle: "Rank Up!",
  rankUpMessage: "You've moved up to top 12% in BST problems.",
};

export const submissionList: SubmissionListItem[] = [
  {
    id: 827192,
    problemId: 173,
    problemTitle: "Binary Search Tree Iterator",
    difficulty: "Medium",
    verdict: "Accepted",
    language: "Python3",
    runtime: "42ms",
    memory: "15.4MB",
    submittedAgo: "2 minutes ago",
  },
  {
    id: 827188,
    problemId: 146,
    problemTitle: "LRU Cache",
    difficulty: "Hard",
    verdict: "Accepted",
    language: "Python3",
    runtime: "98ms",
    memory: "72.1MB",
    submittedAgo: "20 minutes ago",
  },
  {
    id: 827180,
    problemId: 3,
    problemTitle: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    verdict: "Wrong Answer",
    language: "Go",
    runtime: "--",
    memory: "--",
    submittedAgo: "1 hour ago",
  },
  {
    id: 827175,
    problemId: 242,
    problemTitle: "Valid Anagram",
    difficulty: "Easy",
    verdict: "Accepted",
    language: "C++",
    runtime: "12ms",
    memory: "7.2MB",
    submittedAgo: "2 hours ago",
  },
  {
    id: 827169,
    problemId: 23,
    problemTitle: "Merge k Sorted Lists",
    difficulty: "Hard",
    verdict: "Time Limit Exceeded",
    language: "Java",
    runtime: "--",
    memory: "--",
    submittedAgo: "5 hours ago",
  },
  {
    id: 827150,
    problemId: 4,
    problemTitle: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    verdict: "Accepted",
    language: "Rust",
    runtime: "56ms",
    memory: "9.8MB",
    submittedAgo: "1 day ago",
  },
  {
    id: 827142,
    problemId: 20,
    problemTitle: "Valid Parentheses",
    difficulty: "Easy",
    verdict: "Accepted",
    language: "Python3",
    runtime: "24ms",
    memory: "14.0MB",
    submittedAgo: "1 day ago",
  },
  {
    id: 827120,
    problemId: 5,
    problemTitle: "Longest Palindromic Substring",
    difficulty: "Medium",
    verdict: "Runtime Error",
    language: "C++",
    runtime: "--",
    memory: "--",
    submittedAgo: "2 days ago",
  },
];
