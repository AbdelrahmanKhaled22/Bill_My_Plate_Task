import { CatorNoCat } from "../Schrödinger";
import fs from "fs";

type MyBoolean = 0 | 1;

type TestCase = {
  requiredFrames: number;
  inputs: MyBoolean[];
  expectedOutput: MyBoolean[];
};

function readTestData(filePath: string): TestCase[] {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const lines = fileContent.trim().split("\n");
  const testCases: TestCase[] = [];

  for (let i = 0; i < lines.length; i += 3) {
    const requiredFrames = parseInt(lines[i], 10);
    const inputs = lines[i + 1].trim().split("").map(Number) as MyBoolean[];
    const expectedOutput = lines[i + 2]
      .trim()
      .split("")
      .map(Number) as MyBoolean[];

    testCases.push({
      requiredFrames,
      inputs,
      expectedOutput,
    });
  }

  return testCases;
}

describe("CatorNoCat", () => {
  const testCases = readTestData("Data/test_data.txt");

  testCases.forEach((testCase, index) => {
    test(`Test case ${index + 1}: requiredFrames = ${
      testCase.requiredFrames
    }`, () => {
      const cat = new CatorNoCat(testCase.requiredFrames);

      const results: MyBoolean[] = [];
      for (const input of testCase.inputs) {
        results.push(cat.shouldChangeState(input));
      }
      console.log(`Test case ${index + 1}:`);
      console.log(`Required frames: ${testCase.requiredFrames}`);
      console.log(`Inputs: ${testCase.inputs}`);
      console.log(`Results: ${results}`);
      console.log(`Expected Output: ${testCase.expectedOutput}`);

      expect(results).toEqual(testCase.expectedOutput);
    });
  });
});
