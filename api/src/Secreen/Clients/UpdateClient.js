import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const clients = "ht";

const UpdateClient = () => {
    const [clientId, setClientId] = useState("");
    const [name, setName] = useState("");
    const [phone_number, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigation = useNavigation();

    const handleUpdate = async () => {
        if (!clientId || !name || !phone_number || !address) {
            Alert.alert('Error', "Todos los campos son obligatorios.");
            return;
        }

        try {
            const payload = { name, phone_number, address };
            await axios.put(`${clients}/update/${clientId}`, payload);

            Alert.alert('Éxito', "Cliente actualizado correctamente");
            setClientId('');
            setName('');
            setPhone('');
            setAddress('');
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar el cliente.');
            console.error("Error en la actualización:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Actualizar Cliente</Text>

            <TextInput
                style={styles.input}
                placeholder="ID del Cliente"
                value={clientId}
                onChangeText={text => setClientId(text)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Nuevo Nombre"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nuevo Teléfono"
                value={phone_number}
                onChangeText={text => setPhone(text)}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Nueva Dirección"
                value={address}
                onChangeText={text => setAddress(text)}
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={handleUpdate}>
                <Text style={styles.primaryBtnText}>Actualizar Cliente</Text>
            </TouchableOpacity>

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
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    primaryBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
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

export default UpdateClient;
