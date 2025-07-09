export default function getFormattedReviewsCount(reviews: any[]) {
    const count = reviews.length;

    if (count === 1) return `${count} review`;

    if (count < 1000) return `${count} reviews`;

    if (count < 1_000_000)
        return `${(count / 1000).toFixed(count % 1000 < 100 ? 0 : 1)}k reviews`;

    return `${(count / 1_000_000).toFixed(1)}M reviews`;
}
