import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#06080F' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="analyze" />
      <Stack.Screen name="analysis" />
      <Stack.Screen name="risk" />
      <Stack.Screen name="journal" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="report" />
    </Stack>
  );
}
