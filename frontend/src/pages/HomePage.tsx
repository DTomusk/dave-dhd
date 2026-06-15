import { Container, Flex, Heading, Spinner } from '@radix-ui/themes'
import { usePostDump } from '../features/brain_dump/hooks/usePostDump';
import { useBrainDumps } from '../features/brain_dump/hooks/useBrainDumps';
import BrainDumpList from '../features/brain_dump/components/BrainDumpList';
import Callout from '../components/ui/Callout';
import { useForm } from 'react-hook-form';
import type { BrainDumpSchema } from '../features/brain_dump/schemas/brainDumpSchema';
import DumpPostForm from '../features/brain_dump/components/DumpPostForm';

export default function HomePage() {
    const mutation = usePostDump();
    const { data, isLoading } = useBrainDumps();

    const form = useForm<BrainDumpSchema>();

    const handleCreateDump = async (formData: BrainDumpSchema) => {
        await mutation.mutateAsync(formData.content);
        form.reset();
    }

    // TODO: this page should have the latest brain dumps in it 
    // And a button to view all that takes you to a paginated page 
    // There you will be able to stuff
    return (
        <Container size="2" mt="9">
            <Flex direction="column" gap="6">
                <Heading>
                    What's on your mind?
                </Heading>
                {mutation.isError && (
                    <Callout variant="error"
                        text={mutation.error.message}
                    />
                )}
                <DumpPostForm
                    form={form}
                    onSubmit={handleCreateDump}
                />
                
                <Heading size="3" mt="4">
                    Latest Brain Dumps
                </Heading>
                {isLoading && <Spinner />}
                {data && <BrainDumpList items={data.items} />}
            </Flex>
        </Container>
    )
}