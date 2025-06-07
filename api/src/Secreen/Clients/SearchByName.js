import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const clients = "";

const SearchClientByName = () => {
    const [name, setName] = useState("");
    const [clientsData, setClients] = useState([]);
    const navigation = useNavigation();

    const handleSearch = async () => {
        if (!name) {
            Alert.alert('Error', "Debes ingresar un nombre.");
            return;
        }

        try {
            const res = await axios.get(`${clients}/search/name?name=${name}`);
            setClients(res.data);
        } catch (error) {
            Alert.alert('Error', 'No se pudo encontrar clientes.');
            console.error("Error en la búsqueda:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Buscar Cliente por Nombre</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={text => setName(text)}
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSearch}>
                <Text style={styles.primaryBtnText}>Buscar</Text>
            </TouchableOpacity>

            {clientsData.length > 0 ? (
                clientsData.map((client, index) => (
                    <View key={index} style={styles.clientCard}>
                        <Text style={styles.clientText}>📌 {client.name}</Text>
                        <Text>📞 {client.phone_number}</Text>
                        <Text>📍 {client.address}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noResults}>No se encontraron clientes.</Text>
            )}

            <View style={{ marginTop: 30, width: '100%' }}>
                <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Crear Usuario')}>
                    <Text style={styles.navBtnText}>Usuarios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Buscar por Nombre')}>
                    <Text style={styles.navBtnText}>Buscar por Nombre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Buscar por Teléfono')}>
                    <Text style={styles.navBtnText}>Buscar por Teléfono</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Actualizar Cliente')}>
                    <Text style={styles.navBtnText}>Actualizar Cliente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Eliminar Cliente')}>
                    <Text style={styles.navBtnText}>Eliminar Cliente</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 12,
    },
    primaryBtn: {
        backgroundColor: '#2196F3',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    primaryBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    clientCard: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    },
    clientText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    noResults: {
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
    navBtn: {
        backgroundColor: '#e0e0e0',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    navBtnText: {
        fontSize: 14,
        color: '#333',
    },
});

export default SearchClientByName;
