"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type LocationFilterProps = {
  onFilterChange: (filter: { region: string; province: string; district: string }) => void
}

export function LocationFilter({ onFilterChange }: LocationFilterProps) {
  const [region, setRegion] = useState("arequipa")
  const [province, setProvince] = useState("all")
  const [district, setDistrict] = useState("all")

  const provinces = {
    arequipa: [
      { value: "all", label: "Todas las provincias" },
      { value: "arequipa", label: "Arequipa" },
      { value: "camana", label: "Camaná" },
      { value: "caraveli", label: "Caravelí" },
      { value: "castilla", label: "Castilla" },
      { value: "caylloma", label: "Caylloma" },
      { value: "condesuyos", label: "Condesuyos" },
      { value: "islay", label: "Islay" },
      { value: "launion", label: "La Unión" },
    ],
  }

  const districts = {
    arequipa: [
      { value: "all", label: "Todos los distritos" },
      { value: "arequipa", label: "Arequipa" },
      { value: "altoselva", label: "Alto Selva Alegre" },
      { value: "cayma", label: "Cayma" },
      { value: "cerrocolorado", label: "Cerro Colorado" },
      { value: "jacobohunter", label: "Jacobo Hunter" },
      { value: "marianomolgar", label: "Mariano Melgar" },
      { value: "miraflores", label: "Miraflores" },
      { value: "paucarpata", label: "Paucarpata" },
      { value: "sabandia", label: "Sabandía" },
      { value: "sachaca", label: "Sachaca" },
      { value: "socabaya", label: "Socabaya" },
      { value: "tiabaya", label: "Tiabaya" },
      { value: "yanahuara", label: "Yanahuara" },
      { value: "jlbyr", label: "José Luis Bustamante y Rivero" },
    ],
    camana: [
      { value: "all", label: "Todos los distritos" },
      { value: "camana", label: "Camaná" },
      { value: "josemariaqueimado", label: "José María Quimado" },
      { value: "mariscalcaceres", label: "Mariscal Cáceres" },
      { value: "nicolasdepiérola", label: "Nicolás de Piérola" },
      { value: "ocoña", label: "Ocoña" },
      { value: "quilca", label: "Quilca" },
      { value: "samuelhuertas", label: "Samuel Huertas" },
    ],
  }

  const handleRegionChange = (value: string) => {
    setRegion(value)
    setProvince("all")
    setDistrict("all")
    onFilterChange({ region: value, province: "all", district: "all" })
  }

  const handleProvinceChange = (value: string) => {
    setProvince(value)
    setDistrict("all")
    onFilterChange({ region, province: value, district: "all" })
  }

  const handleDistrictChange = (value: string) => {
    setDistrict(value)
    onFilterChange({ region, province, district: value })
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={region} onValueChange={handleRegionChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar región" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="arequipa">Arequipa</SelectItem>
        </SelectContent>
      </Select>

      <Select value={province} onValueChange={handleProvinceChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar provincia" />
        </SelectTrigger>
        <SelectContent>
          {provinces[region as keyof typeof provinces]?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={district} onValueChange={handleDistrictChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar distrito" />
        </SelectTrigger>
        <SelectContent>
          {districts[province as keyof typeof districts]?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          )) || <SelectItem value="all">Todos los distritos</SelectItem>}
        </SelectContent>
      </Select>
    </div>
  )
}
