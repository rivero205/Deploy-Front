"use client"

import { useState, useEffect } from "react"
import StationCard from "../components/StationCard"
import "./Estaciones.css"
import { endpoints } from "../config/api"

const Estaciones = () => {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(endpoints.getLatestReadings)
        if (!response.ok) {
          throw new Error('Error al obtener datos de las estaciones')
        }
        const data = await response.json()

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No hay estaciones disponibles')
        }

        setStations(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching stations:', error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchStations()
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchStations, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="estaciones-page">
      <div className="estaciones-header">
        <h1>Estaciones</h1>
      </div>

      {loading ? (
        <div className="loading">
          <div className="loading-sun">
            <div className="loading-sun-core"></div>
            <div className="loading-sun-rays"></div>
          </div>
          <p>Cargando estaciones...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <h2>Error al cargar las estaciones</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div className="stations-grid">
          {stations.map((station) => (
            <StationCard key={station.id_estacion} station={station} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Estaciones

