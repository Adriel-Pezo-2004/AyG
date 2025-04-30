"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format, subDays } from "date-fns"
import { es } from "date-fns/locale"

type DateFilterProps = {
  onFilterChange: (filter: { type: string; dates?: Date[] }) => void
}

export function DateFilter({ onFilterChange }: DateFilterProps) {
  const [filterType, setFilterType] = useState("month")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<Date[] | undefined>([subDays(new Date(), 7), new Date()])

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value)
    if (value === "custom" && dateRange) {
      onFilterChange({ type: value, dates: dateRange })
    } else {
      onFilterChange({ type: value })
    }
  }

  const handleDateRangeChange = (range: Date[] | undefined) => {
    setDateRange(range)
    if (range && range.length === 2) {
      onFilterChange({ type: "custom", dates: range })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={filterType} onValueChange={handleFilterTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="month">Este mes</SelectItem>
          <SelectItem value="week">Esta semana</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>

      {filterType === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[280px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.length === 2 ? (
                <>
                  {format(dateRange[0], "dd/MM/yyyy", { locale: es })} -{" "}
                  {format(dateRange[1], "dd/MM/yyyy", { locale: es })}
                </>
              ) : (
                <span>Seleccionar fechas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
              locale={es}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
