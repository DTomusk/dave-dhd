import { styles } from "@/theme/theme";
import { ActivityIndicator, KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "@/components/layout/Container";
import BrainDumpForm from "@/components/brain_dump/BrainDumpForm";
import BrainDumpList from "@/components/brain_dump/BrainDumpList";
import { useBrainDumps } from "@davedhd/features/brain_dump/hooks/useBrainDumps";

export default function Index() {
    const { data, isLoading } = useBrainDumps();
    
    return (
        <SafeAreaView style={styles.screen}>
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.keyboard}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <Container>
                        <BrainDumpForm />
                        {isLoading && <ActivityIndicator />}
                        {!isLoading && <BrainDumpList items={data?.items || []} />}
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
  ) ;
}