export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function stringToCaps(text: string) {
  return text[0].toUpperCase() + text.slice(1)
}