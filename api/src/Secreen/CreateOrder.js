import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function CreateOrder() {
  const [clientId, setClientId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, serviceType, notes }),
      });

      const result = await response.json();
      alert(result.message || 'Orden creada');
    } catch (error) {
      console.error(error);
      alert('Error al crear la orden');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Orden</Text>
      <TextInput
        style={styles.input}
        placeholder="ID del Cliente"
        value={clientId}
        onChangeText={setClientId}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de servicio"
        value={serviceType}
        onChangeText={setServiceType}
      />
      <TextInput
        style={styles.input}
        placeholder="Notas"
        value={notes}
        onChangeText={setNotes}
      />
      <Button title="Enviar Orden" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
});