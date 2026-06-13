import { Button, Flex, Heading, Text, TextArea } from '@radix-ui/themes'
import { usePostDump } from '../features/brain_dump/hooks/usePostDump';
import { useBrainDumps } from '../features/brain_dump/hooks/useBrainDumps';
import { useState } from 'react';

export default function HomePage() {
    const mutation = usePostDump();
    const { data } = useBrainDumps();
    const [content, setContent] = useState("");

    const handleCreateDump = async () => {
        await mutation.mutateAsync(content);
    }

    // TODO: this page should have the latest brain dumps in it 
    // And a button to view all that takes you to a paginated page 
    // There you will be able to stuff
    return (
        <Flex direction="column" gap="6">
            <Heading>
                What's on your mind?
            </Heading>
            <TextArea
                placeholder="Enter your brain dump"
                resize="vertical"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
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