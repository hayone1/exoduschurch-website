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