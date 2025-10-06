// src/store/hospital.js
import { defineStore } from 'pinia'

export const useHospitalStore = defineStore('hospital', {
  state: () => ({
    hospitales: [],
    error: null
  }),

  actions: {
    async fetchHospitales(token) {
      try {
        const res = await fetch('https://meddi-training.vercel.app/api/v1/hospital/get/all', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await res.json()
        if (!res.ok) {
          throw new Error(
            Array.isArray(data.message)
              ? data.message.join(' | ')
              : data.message || 'Error desconocido al obtener hospitales'
          )
        }

        this.hospitales = Array.isArray(data.data)
          ? data.data
          : data.data?.data || []
      } catch (err) {
        console.error('Error al obtener hospitales:', err)
        this.error = err.message
      }
    },

    async createHospital(hospitalData, token) {
      const res = await fetch('https://meddi-training.vercel.app/api/v1/hospital/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...hospitalData,
          horario: 'Lun-Vie 8:00-18:00',
          urlGoogleMaps: 'https://maps.google.com/?q=' + encodeURIComponent(hospitalData.name),
          long: '-103.349609',
          lat: '20.659699'
        })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(' | ')
            : data.message || 'Error desconocido al crear hospital'
        )
      }

      if (data.data && data.data.hospital) {
        this.hospitales.push(data.data.hospital)
      }
    }
  }
})
