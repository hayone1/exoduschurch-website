export function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j]!, array[i]!];
    }
    return array;
};

export function randomFloat(min: number, max: number) {
    const random = Math.random() * (max - min) + min;
    return Math.round(random * 10) / 10;
}