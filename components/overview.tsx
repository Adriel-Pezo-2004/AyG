"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Ene",
    total: 1200,
  },
  {
    name: "Feb",
    total: 2100,
  },
  {
    name: "Mar",
    total: 1800,
  },
  {
    name: "Abr",
    total: 2400,
  },
  {
    name: "May",
    total: 1800,
  },
  {
    name: "Jun",
    total: 3200,
  },
  {
    name: "Jul",
    total: 2800,
  },
  {
    name: "Ago",
    total: 2600,
  },
  {
    name: "Sep",
    total: 3100,
  },
  {
    name: "Oct",
    total: 2900,
  },
  {
    name: "Nov",
    total: 1400,
  },
  {
    name: "Dic",
    total: 2300,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
