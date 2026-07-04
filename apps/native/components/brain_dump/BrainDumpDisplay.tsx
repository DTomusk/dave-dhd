import type { BrainDumpResponse } from "@davedhd/features/brain_dump/types";
import FormatDateTime from "@davedhd/lib/date-time";
import Card from "../layout/Card";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import Row from "../layout/Row";
import IconButton from "../ui/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { useActionMenu } from "../ui/ActionMenu";

export default function BrainDumpDisplay(item: BrainDumpResponse) {
    const router = useRouter();
    const { openActionMenu } = useActionMenu();

    return (
        <Card onPress={() => router.push(`/brain_dumps/${item.id}`)}
            header={
                <Row>
                    <Text>
                        {FormatDateTime(item.created_at)}
                    </Text>
                    <IconButton icon={<Ionicons name="ellipsis-vertical" size={24} color="black" />}
                        onPress={() => {
                            openActionMenu([
                                { label: "Action 1", onPress: () => console.log("Action 1 pressed") },
                                { label: "Action 2", onPress: () => console.log("Action 2 pressed") },
                            ]);
                        }}
                    />
                </Row>
            }
            ><Text>{item.content}</Text>
        </Card>
    )
}