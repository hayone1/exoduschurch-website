import { CalendarDate } from "@internationalized/date";

export function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j]!, array[i]!];
    }
    return array;
};
export function randomElement<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
};

export function randomFloat(min: number, max: number) {
    const random = Math.random() * (max - min) + min;
    return Math.round(random * 10) / 10;
}

export function randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function divideIntoParts(value: number, n: number): number[] {
  if (n <= 1) {
    return [0, value];
  }

  const step = value / (n - 1);
  const result: number[] = [];

  for (let i = 0; i < n; i++) {
    result.push(parseFloat((i * step).toFixed(3))); // rounding to 2 decimals for cleaner output
  }

  return result;
}

export function transformToId(input: string) {
  return input.replace(" ", "-").toLowerCase()
}

export function getCalenderDate(date: Date) {
    return new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    );
}

export function paginateArray<T>(array: T[], currentSection: number, itemsInSection: number) {
    const startIndex = (currentSection - 1) * itemsInSection;
    const endIndex = startIndex + itemsInSection;
    return array.slice(startIndex, endIndex);
}