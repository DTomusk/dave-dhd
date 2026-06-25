import AuthForm from "@/components/auth/AuthForm";
import Callout from "@/components/ui/Callout";
import { useAuth } from "@davedhd/features/auth/hooks/useAuth";
import { useRegister } from "@davedhd/features/auth/hooks/useRegister";
import { LoginSchema } from "@davedhd/features/auth/schemas/loginSchema";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export default function Register() {
    const form = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const mutation = useRegister();
  const { signIn } = useAuth();

  const onSubmit = async (formData: LoginSchema) => {
    mutation.mutate(formData, {
      onSuccess: async (response) => {
        await signIn(response.token);
        form.reset();
        router.replace("/");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }

  return (
    <>
        {mutation.isError && (
        <View style={{ marginBottom: 16 }}>
            <Callout 
              variant="error" 
              text={mutation.error.message ?? "An error occurred"} 
              dismissable
            />
        </View>
        )}
        <AuthForm
        form={form}
        action="register"
        onSubmit={onSubmit}
        />
    </>
  );
}