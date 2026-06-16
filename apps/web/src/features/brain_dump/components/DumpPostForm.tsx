import { Button } from "@radix-ui/themes";
import FormTextArea from "../../../components/form/FormTextArea";
import type { UseFormReturn } from "react-hook-form";
import type { BrainDumpSchema } from "@davedhd/features/brain_dump/schemas/brainDumpSchema";

type DumpPostFormProps = {
    form: UseFormReturn<BrainDumpSchema>;
    onSubmit: (data: BrainDumpSchema) => void;
}

export default function DumpPostForm({ form, onSubmit }: DumpPostFormProps) {
    const { handleSubmit, control, formState: { isSubmitting } } = form;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormTextArea
                placeholder="Enter your brain dump"
                resize="vertical"
                name="content"
                control={control}
                rules={{ 
                    required: "Content is required",
                    maxLength: {
                        value: 1000,
                        message: "Content must be less than 1000 characters"
                    }
                }}
                maxLength={1000}
            />
            <Button type="submit" disabled={isSubmitting}>
                Create Brain Dump
            </Button>
        </form>
    )
}