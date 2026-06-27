import { usePostDump } from "@davedhd/features/brain_dump/hooks/usePostDump";
import { BrainDumpSchema } from "@davedhd/features/brain_dump/schemas/brainDumpSchema";
import { useForm } from "react-hook-form";
import Callout from "../ui/Callout";
import Title from "../ui/Title";
import NativeFormField from "../form/NativeFormField";
import Button from "../ui/Button";

export default function BrainDumpForm() {
    const mutation = usePostDump();
    
    const form = useForm<BrainDumpSchema>();

    const handleCreateDump = async (formData: BrainDumpSchema) => {
        await mutation.mutateAsync(formData.content);
        form.reset();
    }

    return (
        <>
            {mutation.isError && (
                <Callout 
                    variant="error" 
                    text="Error creating brain dump. Please try again." 
                    dismissable
                />
            )}
            {mutation.isSuccess && (
                <Callout 
                    disappearAfter={2500} 
                    fadeLength={500} 
                    variant="success" 
                    text="Brain dump created successfully!" 
                />
            )}
            <Title text="What's on your mind?" />
            <NativeFormField
                placeholder="Enter your brain dump"
                name="content"
                control={form.control}
                rules={{
                required: "Content is required",
                maxLength: {
                    value: 1000,
                    message: "Content must be less than 1000 characters"
                }
                }}
                numberOfLines={4}
                expandable
            />
            <Button title="Submit" onPress={form.handleSubmit(handleCreateDump)}
                disabled={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
            />
        </>
    )
}