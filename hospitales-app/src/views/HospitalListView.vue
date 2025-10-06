<template>
  <div class="hospital-list">
    <h1>Lista de Hospitales</h1>

    <div class="actions">
      <button @click="irACrear">Crear Hospital</button>
    </div>

    <div v-if="cargando" class="loading">Cargando hospitales...</div>

    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hospital in hospitales" :key="hospital._id">
            <td>{{ hospital.name }}</td>
            <td>{{ hospital.direccion }}</td>
            <td>{{ hospital.telefono }}</td>
            <td>
              <button class="delete" @click="eliminarHospital(hospital._id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="hospitales.length === 0" class="no-data">
        No hay hospitales registrados.
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HospitalListView',
  setup() {
    const hospitales = ref([])
    const cargando = ref(true)
    const router = useRouter()

    const cargarHospitales = async () => {
      cargando.value = true
      const token = localStorage.getItem('token')

      try {
        const res = await fetch('https://meddi-training.vercel.app/api/v1/hospital/get/all', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await res.json()
        if (data.ok) {
          hospitales.value = data.data.data
        } else {
          console.error('Error al obtener hospitales:', data)
        }
      } catch (err) {
        console.error('Error de red:', err)
      } finally {
        cargando.value = false
      }
    }

    const eliminarHospital = async (id) => {
      const confirmar = confirm('¿Estás seguro de que quieres eliminar este hospital?')
      if (!confirmar) return

      const token = localStorage.getItem('token')

      try {
        const res = await fetch(`https://meddi-training.vercel.app/api/v1/hospital/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await res.json()
        if (data.ok) {
          hospitales.value = hospitales.value.filter(h => h._id !== id)
        } else {
          alert('No se pudo eliminar el hospital.')
          console.error(data)
        }
      } catch (err) {
        console.error('Error al eliminar hospital:', err)
      }
    }

    const irACrear = () => {
      router.push('/hospitales/nuevo')
    }

    onMounted(cargarHospitales)

    return {
      hospitales,
      cargando,
      eliminarHospital,
      irACrear
    }
  }
}
</script>

<style scoped>
.hospital-list {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

button.delete {
  background-color: #e74c3c;
}

button.delete:hover {
  background-color: #c0392b;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.loading {
  text-align: center;
  margin-top: 20px;
}

.no-data {
  margin-top: 20px;
  text-align: center;
  color: #666;
}
</style>
