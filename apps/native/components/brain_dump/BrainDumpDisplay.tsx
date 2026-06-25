import type { BrainDumpResponse } from "@davedhd/features/brain_dump/types";
import FormatDateTime from "@davedhd/lib/date-time";
import Card from "../layout/Card";
import { Text } from "react-native";
import { useRouter } from "expo-router";

export default function BrainDumpDisplay(item: BrainDumpResponse) {
    const router = useRouter();
    return (
        <Card onPress={() => router.push(`/brain_dumps/${item.id}`)}>
            <Text>{FormatDateTime(item.created_at)}</Text>
            <Text>{item.content}</Text>
        </Card>
    )
}