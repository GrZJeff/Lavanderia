import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';

const users = "/users";

const CreateUser = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "Te faltan datos");
            return;
        }

        try {
            const payload = {
                name: String(name),
                email: String(email),
                password: String(password)
            };

            console.log("Datos a enviar:", payload);

            const res = await axios.post(`${users}/register`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            Alert.alert('Bien', res.data.msg);
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            Alert.alert('Error', 'No se pudo crear el usuario');
            console.log("Error al crear usuario", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.title}>Crea Un Usuario</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.primaryBtn}>
                    <Text style={styles.primaryBtnText}>Registrate</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Iniciar Sesion')} style={styles.secondaryBtn}>
                    <Text style={styles.secondaryBtnText}>Inicia Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Registrar Cliente')} style={styles.navBtn}>
                    <Text style={styles.navBtnText}>Ir a Clientes</Text>
                </TouchableOpacity>
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
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 14,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 12,
    },
    primaryBtn: {
        backgroundColor: '#2196F3',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    primaryBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryBtn: {
        backgroundColor: '#6c757d',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    secondaryBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    navBtn: {
        backgroundColor: '#e0e0e0',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    navBtnText: {
        fontSize: 14,
        color: '#333',
    },
});

export default CreateUser;
