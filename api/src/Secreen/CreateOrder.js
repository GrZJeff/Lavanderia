import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

export default function CreateOrder() {
  const [clientId, setClientId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [notes, setNotes] = useState('');

  const [garment, setGarment] = useState('');
  const [garmentService, setGarmentService] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (garment && garmentService && price && quantity) {
      const newItem = {
        garment,
        service: garmentService,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      };
      setItems([...items, newItem]);
      setGarment('');
      setGarmentService('');
      setPrice('');
      setQuantity('');
    } else {
      alert('Completa todos los campos para añadir una prenda');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          serviceType,
          notes,
          items,
        }),
      });

      const result = await response.json();
      alert(result.message || 'Orden creada');
    } catch (error) {
      console.error(error);
      alert('Error al enviar la orden');
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

      <Text style={styles.subtitle}>Agregar Prenda</Text>
      <TextInput
        style={styles.input}
        placeholder="Prenda"
        value={garment}
        onChangeText={setGarment}
      />
      <TextInput
        style={styles.input}
        placeholder="Servicio"
        value={garmentService}
        onChangeText={setGarmentService}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />
      <Button title="Añadir prenda al resumen" onPress={handleAddItem} />

      <Text style={styles.subtitle}>Resumen de la Orden</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.garment}</Text>
            <Text>{item.service}</Text>
            <Text>${item.price} x {item.quantity}</Text>
            <Text>Total: ${item.price * item.quantity}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>TOTAL: ${total}</Text>

      <Button title="Enviar Orden" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  title: { fontSize: 20, marginBottom: 15, fontWeight: 'bold' },
  subtitle: { marginTop: 20, fontSize: 16, fontWeight: 'bold' },
  row: { flexDirection: 'column', borderBottomWidth: 1, paddingVertical: 8 },
  total: { marginTop: 10, fontSize: 16, fontWeight: 'bold' },
});