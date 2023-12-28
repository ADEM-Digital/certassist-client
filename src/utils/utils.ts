import { OptionType } from "../types/FormTypes";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function stringToCaps(text: string) {
  return text[0].toUpperCase() + text.slice(1)
}

export function sentenceToCaps(text: string) {
  let excludedWords = ["and", "of", "the", "for"]
  return text.split(" ").map((word) => excludedWords.findIndex((excludedWord) => word === excludedWord) > -1 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export function parseOptionTypes(options: OptionType[]) {
  return options.map((option) => option.value);
}

export function deepCopyObjectArray(array: Array<Object>) {
  return array.map(item => ({ ...item }));
}