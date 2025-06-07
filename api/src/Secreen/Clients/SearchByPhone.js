import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const clients = "";

const SearchClientByPhone = () => {
    const [phone, setPhone] = useState("");
    const [client, setClient] = useState(null);
    const navigation = useNavigation();

    const handleSearch = async () => {
        if (!phone) {
            Alert.alert('Error', "Debes ingresar un número de teléfono.");
            return;
        }

        try {
            const res = await axios.get(`${clients}/search/phone?phone=${phone}`);
            setClient(res.data);
        } catch (error) {
            Alert.alert('Error', 'No se encontró el cliente.');
            console.error("Error en la búsqueda:", error);
            setClient(null);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Buscar Cliente por Teléfono</Text>

            <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                value={phone}
                onChangeText={text => setPhone(text)}
                keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSearch}>
                <Text style={styles.primaryBtnText}>Buscar</Text>
            </TouchableOpacity>

            {client ? (
                <View style={styles.clientCard}>
                    <Text style={styles.clientText}>📌 {client.name}</Text>
                    <Text>📞 {client.phone_number}</Text>
                    <Text>📍 {client.address}</Text>
                </View>
            ) : (
                <Text style={styles.noResults}>No se encontraron resultados.</Text>
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
        marginTop: 10,
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

export default SearchClientByPhone;
