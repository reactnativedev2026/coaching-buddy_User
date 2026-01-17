export default function getCapitalizedText(text: string) {
    const trimmedText = text?.trim();

    return trimmedText?.slice(0, 1).toUpperCase() + trimmedText?.slice(1);
}
