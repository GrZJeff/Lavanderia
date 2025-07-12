import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function GarmentManager() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [garments, setGarments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/garments')
      .then(res => res.json())
      .then(data => setGarments(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:5000/garments/${editingId}`
      : 'http://localhost:5000/garments';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, color }),
    });

    const res = await fetch('http://localhost:5000/garments');
    const updated = await res.json();
    setGarments(updated);

    setName('');
    setType('');
    setColor('');
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/garments/${id}`, { method: 'DELETE' });

    setGarments(prev => prev.filter(g => g.id !== id));
    if (editingId === id) {
      setName('');
      setType('');
      setColor('');
      setEditingId(null);
    }
  };

  const handleEdit = (garment) => {
    setName(garment.name);
    setType(garment.type);
    setColor(garment.color);
    setEditingId(garment.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingId ? 'Editar Prenda' : 'Crear Prenda'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      <Button title={editingId ? 'Actualizar' : 'Crear'} onPress={handleSubmit} />
      {editingId && (
        <Button
          title="Cancelar Edición"
          onPress={() => {
            setName('');
            setType('');
            setColor('');
            setEditingId(null);
          }}
          color="#888"
        />
      )}

      <Text style={styles.subtitle}>Lista de Prendas</Text>
      <FlatList
        data={garments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name} ({item.type}) - {item.color}</Text>
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