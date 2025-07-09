import { useMemo } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import RenderHTML, {
    CustomTextualRenderer,
    TNode,
    TNodeChildrenRenderer,
} from "react-native-render-html";

type Props = {
    html: string;
    containerClassName?: string;
};

export default function HTMLText({ html, containerClassName }: Props) {
    const { width } = useWindowDimensions();

    const tagsStyles = useMemo(
        () => ({
            p: {
                fontFamily: "Poppins-Regular",
                fontSize: 14,
                lineHeight: 22,
                color: "#000",
            },
        }),
        []
    );

    // ✅ Custom renderer for <strong> with type-safe handling
    const customRenderers = {
        strong: (({ tnode }: { tnode: TNode }) => {
            return (
                <Text style={{ fontFamily: "Poppins-Bold" }}>
                    <TNodeChildrenRenderer tnode={tnode} />
                </Text>
            );
        }) satisfies CustomTextualRenderer,
    };

    return (
        <View className={containerClassName}>
            <RenderHTML
                contentWidth={width}
                source={{ html }}
                tagsStyles={tagsStyles}
                renderers={customRenderers}
            />
        </View>
    );
}
