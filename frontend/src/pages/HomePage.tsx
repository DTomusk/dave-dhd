import { Button, Flex, Text } from '@radix-ui/themes'
import { usePostDump } from '../features/brain_dump/hooks/usePostDump';
import { useBrainDumps } from '../features/brain_dump/hooks/useBrainDumps';

export default function HomePage() {
    const mutation = usePostDump();
    const { data, isLoading, error } = useBrainDumps();

    const handleCreateDump = async () => {
        await mutation.mutateAsync("This is a brain dump");
    }
    return (
        <Flex direction="column" gap="6">
            <Text>
                Home Page
            </Text>
            <Button onClick={handleCreateDump}>
                Create Brain Dump
            </Button>
            {data && data.items.map(dump => (
                <Text key={dump.id}>
                    {dump.content}
                </Text>
            ))}
        </Flex>
    )
}