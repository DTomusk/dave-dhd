import { styles } from "@/theme/theme";
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "@/components/layout/Container";
import BrainDumpForm from "@/components/brain_dump/BrainDumpForm";
import BrainDumpList from "@/components/brain_dump/BrainDumpList";
import { useBrainDumps } from "@davedhd/features/brain_dump/hooks/useBrainDumps";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";

export default function Index() {
    const { data, isLoading } = useBrainDumps(0, 3);
    const router = useRouter();
    
    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Container>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={styles.keyboard}
                    >
                        <BrainDumpForm/>
                    </KeyboardAvoidingView>
                    <View style={{ height: 40 }} />
                    <Title text="Latest Dumps" />
                    {isLoading && <ActivityIndicator />}
                    {!isLoading && <BrainDumpList items={data?.items || []} />}
                    <Button title="View All" onPress={() => router.push("/brain_dumps")} />
                </Container>
            </ScrollView>
        </SafeAreaView>
  ) ;
}