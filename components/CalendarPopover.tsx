"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"

import { Button } from "@/components/ui/button"

interface Props {
    date: any
    setDate: any
}

export default function CalendarPopover({ date, setDate }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="max-w-[10em] my-2" variant="default">Select Date</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="flex justify-center"
                />
            </PopoverContent>
        </Popover>
    )
}