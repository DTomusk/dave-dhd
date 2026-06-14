import { Button, Flex, Heading, Spinner, TextArea } from '@radix-ui/themes'
import { usePostDump } from '../features/brain_dump/hooks/usePostDump';
import { useBrainDumps } from '../features/brain_dump/hooks/useBrainDumps';
import { useState } from 'react';
import BrainDumpList from '../features/brain_dump/components/BrainDumpList';
import Callout from '../components/ui/Callout';

export default function HomePage() {
    const mutation = usePostDump();
    const { data, isLoading } = useBrainDumps();
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
            {mutation.isError && (
                <Callout variant="error"
                    text={mutation.error.message}
                />
            )}
            <TextArea
                placeholder="Enter your brain dump"
                resize="vertical"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handleCreateDump}>
                Create Brain Dump
            </Button>
            {isLoading && <Spinner />}
            {data && <BrainDumpList items={data.items} />}
        </Flex>
    )
}