import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "../contexts/authContext";

const HeaderLogout = () => {
  const { user, logout } = useAuth();
  return user ? (
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
  ) : null;
}

const RootLayout = () => {
  return(
  <AuthProvider>
  <Stack 
  screenOptions={{headerStyle: {
    backgroundColor: '#ff8c00',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
  fontSize: 20,
  fontWeight: "bold"
  },
  headerRight: () => <HeaderLogout />,
  contentStyle: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
  }
}}>
  <Stack.Screen name="index" options={{title: 'Home'}}/>
  <Stack.Screen name="notes" options={{headerTitle: 'Notes'}}/>
  <Stack.Screen name="auth" options={{headerTitle: 'Login'}}/>
  </Stack>
  </AuthProvider>
);
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#ff4500',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

})

export default RootLayout;