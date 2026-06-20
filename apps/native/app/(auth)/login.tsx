import AuthForm from "@/components/auth/AuthForm";
import Callout from "@/components/ui/Callout";
import { useAuth } from "@davedhd/features/auth/hooks/useAuth";
import { useLogin } from "@davedhd/features/auth/hooks/useLogin";
import { LoginSchema } from "@davedhd/features/auth/schemas/loginSchema";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export default function Login() {
    const form = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const mutation = useLogin();
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
            <Callout variant="error" 
            text={mutation.error.message ?? "An error occurred"} 
            />
        </View>
        )}
        <AuthForm
        form={form}
        action="login"
        onSubmit={onSubmit}
        />
    </>
  );
}