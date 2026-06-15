import { Button, Flex, Heading, Spinner } from '@radix-ui/themes'
import { usePostDump } from '../features/brain_dump/hooks/usePostDump';
import { useBrainDumps } from '../features/brain_dump/hooks/useBrainDumps';
import BrainDumpList from '../features/brain_dump/components/BrainDumpList';
import Callout from '../components/ui/Callout';
import { useForm } from 'react-hook-form';
import type { BrainDumpSchema } from '../features/brain_dump/schemas/brainDumpSchema';
import FormTextArea from '../components/form/FormTextArea';

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
        <Flex direction="column" gap="6">
            <form onSubmit={form.handleSubmit(handleCreateDump)}>
                <Heading>
                    What's on your mind?
                </Heading>
                {mutation.isError && (
                    <Callout variant="error"
                        text={mutation.error.message}
                    />
                )}
                <FormTextArea
                    placeholder="Enter your brain dump"
                    resize="vertical"
                    name="content"
                    control={form.control}
                    rules={{ 
                        required: "Content is required",
                        maxLength: {
                            value: 1000,
                            message: "Content must be less than 1000 characters"
                        }
                    }}
                />
                <Button type="submit" disabled={mutation.isPending}>
                    Create Brain Dump
                </Button>
            </form>
            {isLoading && <Spinner />}
            {data && <BrainDumpList items={data.items} />}
        </Flex>
    )
}