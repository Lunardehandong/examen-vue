<template>
  <div>
    <q-table
      title="Hospitales"
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      bordered
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Columnas para mostrar en la tabla
const columns = [
  { name: 'name', label: 'Nombre', field: 'name', align: 'left' },
  { name: 'phone', label: 'Teléfono', field: 'phone', align: 'left' },
  { name: 'address', label: 'Dirección', field: 'address', align: 'left' }
]

// Datos simulados (esto luego se reemplaza con fetch real)
const rows = ref([
  { id: 1, name: 'Hospital Central', phone: '333-111-2222', address: 'Av. Salud 123' },
  { id: 2, name: 'Hospital de la Luz', phone: '555-777-8888', address: 'Calle Bienestar 45' }
])
</script>
