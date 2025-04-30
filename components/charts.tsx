"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart as RechartsLineChart,
} from "recharts"

type ChartData = {
  name: string
  value: number
  color?: string
}

export function DonutChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || `hsl(${index * 45}, 70%, 60%)`} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

export function BarChart({ data, horizontal = false }: { data: ChartData[]; horizontal?: boolean }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {horizontal ? (
          <>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
          </>
        ) : (
          <>
            <XAxis dataKey="name" />
            <YAxis />
          </>
        )}
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function LineChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#f59e0b" activeDot={{ r: 8 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
