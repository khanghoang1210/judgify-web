import type { Difficulty } from "./problem";

export interface ProblemMethod {
  signature: string;
  description: string;
}

export interface ProblemExample {
  input: string[];
  output: string;
  explanation: string[];
}

export interface ProblemLanguage {
  label: string;
  value: string;
}

export interface ProblemTestCase {
  name: string;
  methods: string;
  args: string;
}

export interface ProblemDetail {
  id: number;
  number: number;
  title: string;
  difficulty: Difficulty;
  intro: string;
  methodsIntro: string;
  methods: ProblemMethod[];
  example: ProblemExample;
  constraints: string[];
  languages: ProblemLanguage[];
  starterCode: string;
  testCases: ProblemTestCase[];
}
