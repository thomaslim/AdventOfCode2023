import assert from "node:assert";
import test from "node:test";

const myFunct = (input) => {
  const splittedInput = input.split("");
  return splittedInput;
};

function myFunct2(input) {
  const splittedInput = input.split("");
  return splittedInput;
}

test("shouldShould equal", () => {
  assert.deepEqual(myFunct("bonjour"), ["b", "o", "n", "j", "o", "u", "r"]);
  assert.deepEqual(myFunct2("bonjour"), ["b", "o", "n", "j", "o", "u", "r"]);
});
