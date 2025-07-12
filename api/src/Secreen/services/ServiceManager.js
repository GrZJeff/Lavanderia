import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function ServiceManager() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:5000/services/${editingId}`
      : 'http://localhost:5000/services';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });

    const res = await fetch('http://localhost:5000/services');
    const updated = await res.json();
    setServices(updated);

    setName('');
    setPrice('');
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/services/${id}`, { method: 'DELETE' });

    setServices(prev => prev.filter(s => s.id !== id));
    if (editingId === id) {
      setName('');
      setPrice('');
      setEditingId(null);
    }
  };

  const handleEdit = (service) => {
    setName(service.name);
    setPrice(service.price.toString());
    setEditingId(service.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingId ? 'Editar Servicio' : 'Crear Servicio'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del servicio"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Button title={editingId ? 'Actualizar' : 'Crear'} onPress={handleSubmit} />
      {editingId && (
        <Button
          title="Cancelar Edición"
          onPress={() => {
            setName('');
            setPrice('');
            setEditingId(null);
          }}
          color="#888"
        />
      )}

      <Text style={styles.subtitle}>Lista de Servicios</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name} - ${item.price}</Text>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => handleEdit(item)} />
              <Button title="Eliminar" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  subtitle: { marginTop: 20, fontSize: 16, fontWeight: 'bold' },
  row: { marginBottom: 10 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 5 },
});