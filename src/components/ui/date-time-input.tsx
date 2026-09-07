"use client"

import * as React from "react"
import { format, isValid, set } from "date-fns"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cn } from "@/lib/utils"
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"

export interface DateTimePickerProps {
  value: string
  onChange: (value: string) => void
  min?: string
  className?: string
}

export const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  ({ value, onChange, min, className }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [localDate, setLocalDate] = React.useState<Date | null>(null)
    const [displayValue, setDisplayValue] = React.useState("")
    const [initialized, setInitialized] = React.useState(false)

    // Generate hour options (1-12)
    const hourOptions = React.useMemo(() => 
      Array.from({ length: 12 }, (_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString()
      }))
    , [])

    // Generate minute options (0-59)
    const minuteOptions = React.useMemo(() => 
      Array.from({ length: 60 }, (_, i) => ({
        label: i.toString().padStart(2, '0'),
        value: i.toString()
      }))
    , [])

    // AM/PM options
    const periodOptions = React.useMemo(() => [
      { label: "AM", value: "AM" },
      { label: "PM", value: "PM" }
    ], [])

    // Generate month options - memoized
    const monthOptions = React.useMemo(() => 
      Array.from({ length: 12 }, (_, i) => ({
        label: format(new Date(2000, i, 1), "MMMM"),
        value: (i + 1).toString()
      }))
    , [])

    // Generate year options - memoized
    const yearOptions = React.useMemo(() => {
      const nowYear = new Date().getFullYear()
      return Array.from({ length: 6 }, (_, i) => ({
        label: (nowYear + i).toString(),
        value: (nowYear + i).toString()
      }))
    }, [])

    // Initialize from value prop - separated the initialization logic
    React.useEffect(() => {
      if (value) {
        const parsedDate = new Date(value)
        if (isValid(parsedDate)) {
          setLocalDate(parsedDate)
          setDisplayValue(format(parsedDate, "MM-dd-yyyy hh:mm a"))
          setInitialized(true)
        }
      }
    }, [value])

    // Handle open state changes separately
    React.useEffect(() => {
      if (open && !localDate && !initialized) {
        // Only set default date when opened and no date is set
        const now = new Date()
        setLocalDate(now)
        setDisplayValue(format(now, "MM-dd-yyyy hh:mm a"))
        setInitialized(true)
        // Notify parent component outside the render cycle
        setTimeout(() => {
          onChange(now.toISOString())
        }, 0)
      }
    }, [open, localDate, initialized, onChange])

    // Generate day options based on selected month/year - memoized
    const dayOptions = React.useMemo(() => {
      if (!localDate) return []
      
      const month = localDate.getMonth() + 1
      const year = localDate.getFullYear()
      const daysInMonth = new Date(year, month, 0).getDate()
      
      return Array.from({ length: daysInMonth }, (_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString()
      }))
    }, [localDate && localDate.getMonth(), localDate && localDate.getFullYear()])

    // Current date values - derived from state
    const currentValues = React.useMemo(() => {
      if (!localDate) return { 
        month: "1", 
        day: "1", 
        year: new Date().getFullYear().toString(), 
        hour: "12", 
        minute: "0", 
        period: "AM"
      }
      
      const month = (localDate.getMonth() + 1).toString()
      const day = localDate.getDate().toString()
      const year = localDate.getFullYear().toString()
      
      // Time values
      let hour = localDate.getHours()
      const minute = localDate.getMinutes().toString()
      const period = hour >= 12 ? "PM" : "AM"
      
      // Convert to 12-hour format
      hour = hour % 12
      if (hour === 0) hour = 12 // Handle midnight/noon
      
      return { 
        month, 
        day, 
        year, 
        hour: hour.toString(), 
        minute, 
        period 
      }
    }, [localDate])

    // Handle time change with separate hour, minute, and period
    const handleTimeChange = React.useCallback((
      type: "hour" | "minute" | "period", 
      newValue: string
    ) => {
      if (!localDate) return

      let newDate = new Date(localDate)
      
      // Get current values
      let hours = newDate.getHours()
      let minutes = newDate.getMinutes()
      const isPM = hours >= 12
      
      // Convert to 12-hour for manipulation
      hours = hours % 12
      if (hours === 0) hours = 12
      
      switch (type) {
        case "hour":
          let newHour = parseInt(newValue)
          // Adjust hour for AM/PM
          if (isPM && newHour !== 12) newHour += 12
          if (!isPM && newHour === 12) newHour = 0
          newDate = set(newDate, { hours: newHour })
          break
        case "minute":
          newDate = set(newDate, { minutes: parseInt(newValue) })
          break
        case "period":
          const currentHour = newDate.getHours() % 12
          if (newValue === "AM" && hours !== 12) {
            // Convert to AM - hour stays the same unless it's 12 PM
            newDate = set(newDate, { hours: currentHour })
          } else if (newValue === "AM" && hours === 12) {
            // 12 PM -> 12 AM (0 hours)
            newDate = set(newDate, { hours: 0 })
          } else if (newValue === "PM" && hours !== 12) {
            // Convert to PM - add 12 to hours
            newDate = set(newDate, { hours: currentHour + 12 })
          } else if (newValue === "PM" && hours === 12) {
            // 12 AM -> 12 PM (12 hours)
            newDate = set(newDate, { hours: 12 })
          }
          break
      }
      
      if (isValid(newDate)) {
        setLocalDate(newDate)
        setDisplayValue(format(newDate, "MM-dd-yyyy hh:mm a"))
        onChange(newDate.toISOString())
      }
    }, [localDate, onChange])

    // Unified handler for date changes
    const handleDateChange = React.useCallback((
      type: "month" | "day" | "year", 
      newValue: string
    ) => {
      if (!localDate) return

      let newDate = new Date(localDate)
      
      switch (type) {
        case "month":
          newDate = set(newDate, { month: parseInt(newValue) - 1 })
          break
        case "day":
          newDate = set(newDate, { date: parseInt(newValue) })
          break
        case "year":
          newDate = set(newDate, { year: parseInt(newValue) })
          break
      }
      
      if (isValid(newDate)) {
        setLocalDate(newDate)
        setDisplayValue(format(newDate, "MM-dd-yyyy hh:mm a"))
        onChange(newDate.toISOString())
      }
    }, [localDate, onChange])

    return (
      <div className={cn("relative w-full", className)} ref={ref}>
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
          <PopoverPrimitive.Trigger asChild>
            <button
              type="button"
              className={cn(
                "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {displayValue || "Select date and time"}
              <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
            </button>
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            className="w-auto p-4 bg-background border rounded-md shadow-md z-50"
            align="start"
            sideOffset={5}
          >
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Date</h4>
                <div className="flex gap-2">
                  {/* Month Select */}
                  <Select
                    value={currentValues.month}
                    onValueChange={(value) => handleDateChange("month", value)}
                    items={monthOptions}
                    className="w-32"
                  />
                  
                  {/* Day Select */}
                  <Select
                    value={currentValues.day}
                    onValueChange={(value) => handleDateChange("day", value)}
                    items={dayOptions}
                    className="w-16"
                  />
                  
                  {/* Year Select */}
                  <Select
                    value={currentValues.year}
                    onValueChange={(value) => handleDateChange("year", value)}
                    items={yearOptions}
                    className="w-24"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Time</h4>
                <div className="flex gap-2">
                  {/* Hour Select */}
                  <Select
                    value={currentValues.hour}
                    onValueChange={(value) => handleTimeChange("hour", value)}
                    items={hourOptions}
                    className="w-16"
                  />
                  
                  {/* Minute Select */}
                  <Select
                    value={currentValues.minute}
                    onValueChange={(value) => handleTimeChange("minute", value)}
                    items={minuteOptions}
                    className="w-20"
                  />
                  
                  {/* AM/PM Select */}
                  <Select
                    value={currentValues.period}
                    onValueChange={(value) => handleTimeChange("period", value)}
                    items={periodOptions}
                    className="w-16"
                  />
                </div>
              </div>
              
              <button
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                Apply
              </button>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      </div>
    )
  }
)

DateTimePicker.displayName = "DateTimePicker"

// Optimized Select component
const Select = React.memo(({ 
  value, 
  onValueChange, 
  items, 
  className 
}: { 
  value: string, 
  onValueChange: (value: string) => void, 
  items: { label: string, value: string }[],
  className?: string 
}) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger 
        className={cn(
          "flex h-9 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring",
          className
        )}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content 
          className="overflow-hidden bg-background border rounded-md shadow-md z-50"
          position="popper"
        >
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6 bg-background cursor-default">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-1 max-h-72">
            <SelectPrimitive.Group>
              {items.map((item) => (
                <SelectPrimitive.Item
                  key={item.value}
                  value={item.value}
                  className="relative flex items-center h-8 px-6 py-2 text-sm rounded-sm cursor-default hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground outline-none"
                >
                  <SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6 bg-background cursor-default">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
})

Select.displayName = "Select"