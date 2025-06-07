import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const clients = "";

const CreateClient = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [phone_number, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async () => {
        if (!name || !phone_number || !address) {
            Alert.alert('Error', "Te faltaron datos papito");
            return;
        }

        try {
            const payload = {
                name: String(name),
                phone_number: String(phone_number),
                address: String(address),
            };

            console.log("Datos a enviar:", payload);

            const res = await axios.post(`${clients}/create`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            Alert.alert('Bien', res.data.msg);
            setName('');
            setPhone('');
            setAddress('');
        } catch (error) {
            Alert.alert('Error', 'No se pudo crear el cliente');
            console.error("Error al crear cliente:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.title}>Registrar Cliente</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    value={phone_number}
                    onChangeText={text => setPhone(text)}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dirección"
                    value={address}
                    onChangeText={text => setAddress(text)}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                    <Text style={styles.btnText}>Registrate</Text>
                </TouchableOpacity>

                <View style={styles.navButtons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Crear Usuario')} style={styles.navBtn}>
                        <Text style={styles.navBtnText}>Usuarios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Registrar Cliente')} style={styles.navBtn}>
                        <Text style={styles.navBtnText}>Registrar Cliente</Text>
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
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    btn: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    navButtons: {
        marginTop: 30,
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

export default CreateClient;
