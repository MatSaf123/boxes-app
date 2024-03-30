import { PartOption } from "./types";

export const boxCodenamePartOneOptions: PartOption[] = [
  { value: { name: "Box A" }, label: "Box A" },
  { value: { name: "Box B" }, label: "Box B" },
  { value: { name: "Box C" }, label: "Box C" },
];

export const boxCodenamePartTwoOptions: PartOption[] = [
  {
    value: { name: "Thing 1", partOneDependencies: ["Box A"] },
    label: "Thing 1 (needs Box A)",
  },
  {
    value: { name: "Thing 2", partOneDependencies: ["Box A"] },
    label: "Thing 2 (needs Box A)",
  },
  {
    value: { name: "Thing 3", partOneDependencies: ["Box B"] },
    label: "Thing 3 (needs Box B)",
  },
  {
    value: { name: "Thing 4", partOneDependencies: ["Box A", "Box B"] },
    label: "Thing 4 (needs Box A or B)",
  },
  {
    value: { name: "Thing 5", partOneDependencies: ["Box C"] },
    label: "Thing 5 (needs Box C)",
  },
];

export const boxCodenamePartThreeOptions: PartOption[] = [
  {
    value: {
      name: "Foo",
      partOneDependencies: ["Box A"],
      partTwoDependencies: ["Thing 1"],
    },
    label: "Foo (needs BoxA, Thing 1)",
  },
  {
    value: {
      name: "Bar",
      partOneDependencies: ["Box B"],
      partTwoDependencies: ["Thing 2", "Thing 3"],
    },
    label: "Bar (needs BoxB, Thing 2 or 3)",
  },
  {
    value: {
      name: "Baz",
      partOneDependencies: ["Box C"],
      partTwoDependencies: ["Thing 4", "Thing 5"],
    },
    label: "Baz (needs BoxC, Thing 4 or 5)",
  },
  {
    value: {
      name: "Tar",
      partOneDependencies: ["Box C"],
      partTwoDependencies: ["Thing 1"],
    },
    label: "Tar (needs BoxC, Thing 1)",
  },
];
