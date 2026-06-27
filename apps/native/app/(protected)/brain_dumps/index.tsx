import BrainDumpDisplay from "@/components/brain_dump/BrainDumpDisplay";
import Container from "@/components/layout/Container";
import { styles } from "@/theme/theme";
import { useInfiniteDumps } from "@davedhd/features/brain_dump/hooks/useBrainDumps";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const { 
        data, 
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteDumps(10);

    return (
        <SafeAreaView style={styles.screen}>
            <Container>
                {isLoading && <ActivityIndicator />}
                {!isLoading && <FlatList
                    data={data?.pages.flatMap(page => page.items) || []}
                    renderItem={({ item }) => <BrainDumpDisplay {...item} />}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                    removeClippedSubviews={false}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                />}
            </Container>
        </SafeAreaView>
    )
}