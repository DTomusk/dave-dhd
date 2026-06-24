import type { BrainDumpResponse } from "@davedhd/features/brain_dump/types";
import FormatDateTime from "@davedhd/lib/date-time";
import Card from "../layout/Card";
import { Text } from "react-native";

export default function BrainDumpDisplay(item: BrainDumpResponse) {
    return (
        <Card>
            <Text>{item.content}</Text>
            <Text>{FormatDateTime(item.created_at)}</Text>
        </Card>
    )
}