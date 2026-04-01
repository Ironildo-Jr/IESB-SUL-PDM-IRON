import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DespesaRecente from "./screens/DespesaRecente";
import TodasDespesas from "./screens/TodasDespesas";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import GerenciarDespesa from "./screens/GerenciarDespesa";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "./components/IconButton";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <IconButton
            icon="add"
            color="blue"
            size={24}
            onPress={() => {
              navigation.navigate("GerenciarDespesa");
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesaRecente"
        component={DespesaRecente}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
          tabBarLabel: "Recentes",
          title: "Despesas Recentes",
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
          tabBarLabel: "Todas",
          title: "Todas as Despesas",
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Despesas" component={BottomTabScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
