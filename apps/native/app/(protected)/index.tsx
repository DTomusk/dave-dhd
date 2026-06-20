import { styles } from "@/theme";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Native App!</Text>
      <Text style={styles.subtitle}>This is the home page.</Text>
    </View>
  );
}