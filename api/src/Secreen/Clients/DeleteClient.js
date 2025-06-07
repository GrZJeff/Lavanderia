import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const clients = "";

const DeleteClient = () => {
    const [clientId, setClientId] = useState("");
    const navigation = useNavigation();

    const handleDelete = async () => {
        if (!clientId) {
            Alert.alert('Error', "Debes ingresar el ID del cliente.");
            return;
        }

        try {
            await axios.delete(`${clients}/delete/${clientId}`);
            Alert.alert('Éxito', "Cliente eliminado correctamente");
            setClientId('');
        } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el cliente.');
            console.error("Error al eliminar cliente:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Eliminar Cliente</Text>

            <TextInput
                style={styles.input}
                placeholder="ID del Cliente"
                value={clientId}
                onChangeText={text => setClientId(text)}
                keyboardType="numeric"
            />

            <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
                <Text style={styles.deleteBtnText}>Eliminar Cliente</Text>
            </TouchableOpacity>

            <View style={styles.navButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('Crear Usuario')} style={styles.navBtn}>
                    <Text style={styles.navBtnText}>Usuarios</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Registrar Cliente')} style={styles.navBtn}>
                    <Text style={styles.navBtnText}>Crear Cliente</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Buscar por Nombre')} style={styles.navBtn}>
                    <Text style={styles.navBtnText}>Buscar por Nombre</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Buscar por Teléfono')} style={styles.navBtn}>
                    <Text style={styles.navBtnText}>Buscar por Teléfono</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Actualizar Cliente')} style={styles.navBtn}>
                    <Text style={styles.navBtnText}>Actualizar Cliente</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Eliminar Cliente')} style={styles.navBtn}>
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
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    deleteBtn: {
        backgroundColor: '#d9534f',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    deleteBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    navButtons: {
        marginTop: 30,
        width: '100%',
    },
    navBtn: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 6,
        marginBottom: 8,
        alignItems: 'center',
    },
    navBtnText: {
        fontSize: 14,
        color: '#333',
    },
});

export default DeleteClient;
