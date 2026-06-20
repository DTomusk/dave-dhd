import NativeFormField from "@/components/form/NativeFormField";
import { styles } from "@/theme";
import { Text, View } from "react-native";
import { usePostDump } from '@davedhd/features/brain_dump/hooks/usePostDump';
import { useForm } from "react-hook-form";
import type { BrainDumpSchema } from '@davedhd/features/brain_dump/schemas/brainDumpSchema';
import Button from "@/components/ui/Button";

export default function Index() {
    const mutation = usePostDump();

    const form = useForm<BrainDumpSchema>();

    const handleCreateDump = async (formData: BrainDumpSchema) => {
        await mutation.mutateAsync(formData.content);
        form.reset();
    }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>What's on your mind?</Text>
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
        />
        <Button title="Submit" onPress={form.handleSubmit(handleCreateDump)} />
    </View>
  );
}