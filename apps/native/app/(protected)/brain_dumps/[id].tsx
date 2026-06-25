import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function BrainDumpPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <Text>Brain Dump Page for ID: {id}</Text>
    );
}