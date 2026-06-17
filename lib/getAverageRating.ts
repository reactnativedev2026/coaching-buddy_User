export default function getAverageRating(ratings: number[]) {
    if (ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, curr) => acc + curr, 0);
    const average = sum / ratings.length;

    return Math.max(0, Math.min(5, Math.round(average * 10) / 10));
}
