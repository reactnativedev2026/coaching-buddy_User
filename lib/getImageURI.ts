import envConfig from "@/config/env.config";

export default function getImageURI(imagePath: string) {
    if (imagePath == null) return "https://picsum.photos/seed/picsum/200";

    const serverUrl = envConfig.serverUrl;
    const serverUrlWithoutApiPart = serverUrl.slice(0, -4);

    return `${serverUrlWithoutApiPart}/${imagePath}`;

    // return "https://picsum.photos/seed/picsum/200";
}
