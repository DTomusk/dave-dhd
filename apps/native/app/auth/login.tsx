import AuthForm from "@/components/auth/AuthForm";
import Button from "@/components/ui/Button";
import Callout from "@/components/ui/Callout";
import { useOverlay } from "@/hooks/useOverlay";
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

  const overlay = useOverlay();

  return (
    <>
      <Button title="Open overlay" onPress={() =>
    overlay.showOverlay({
      content: (
        <View
          style={{
            position: "absolute",
            top: 200,
            left: 40,
          width: 200,
          height: 200,
          backgroundColor: "red",
        }}
      />
    ),
    dismissOnBackdropPress: true,
    backdrop: true,
  })} />
        {mutation.isError && (
          <View style={{ marginBottom: 16 }}>
              <Callout variant="error" 
                text={mutation.error.message ?? "An error occurred"} 
                dismissable
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