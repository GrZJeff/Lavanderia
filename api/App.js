import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import CreateClient from './src/Secreen/Clients/CreateClient';
import SearchClientByName from './src/Secreen/Clients/SearchByName';
import SearchClientByPhone from './src/Secreen/Clients/SearchByPhone';
import UpdateClient from './src/Secreen/Clients/UpdateClient';
import DeleteClient from './src/Secreen/Clients/DeleteClient';
import CreateUser from './src/Secreen/Users/CreateUser';
import LoginUsers from './src/Secreen/Users/Login';



const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Registrar Cliente" component={CreateClient} />
                <Stack.Screen name="Buscar por Nombre" component={SearchClientByName} />
                <Stack.Screen name="Buscar por Teléfono" component={SearchClientByPhone} />
                <Stack.Screen name="Actualizar Cliente" component={UpdateClient} />
                <Stack.Screen name="Eliminar Cliente" component={DeleteClient} />
                <Stack.Screen name="Crear Usuario" component={CreateUser} />
                <Stack.Screen name="Iniciar Sesion" component={LoginUsers} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}