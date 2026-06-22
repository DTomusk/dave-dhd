import NativeFormField from "@/components/form/NativeFormField";
import { styles } from "@/theme/theme";
import { KeyboardAvoidingView } from "react-native";
import { usePostDump } from '@davedhd/features/brain_dump/hooks/usePostDump';
import { useForm } from "react-hook-form";
import type { BrainDumpSchema } from '@davedhd/features/brain_dump/schemas/brainDumpSchema';
import Button from "@/components/ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "@/components/layout/Container";
import Title from "@/components/ui/Title";
import Callout from "@/components/ui/Callout";

export default function Index() {
    const mutation = usePostDump();

    const form = useForm<BrainDumpSchema>();

    const handleCreateDump = async (formData: BrainDumpSchema) => {
        await mutation.mutateAsync(formData.content);
        form.reset();
    }
  return (
    <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.keyboard}
        >
            <Container>
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
                />
                <Button title="Submit" onPress={form.handleSubmit(handleCreateDump)} />
            </Container>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}