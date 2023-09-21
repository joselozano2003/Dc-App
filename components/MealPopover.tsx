"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"

interface Props {
    handle: any
}

export default function MealPopover({ handle }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="max-w-[10em] my-2" variant="default">Select Meal</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <h1 className="text-center font-bold m-4 text-xl">Change Meal</h1>
                <div className="flex flex-col justify-between items-center [&>*]:m-2 [&>*]:min-w-card">
                    <Button variant="default" onClick={() => handle("BREAKFAST")}>Breakfast</Button>
                    <Button variant="default" onClick={() => handle("LUNCH")}>Lunch</Button>
                    <Button variant="default" onClick={() => handle("DINNER")}>Dinner</Button>
                </div>

            </PopoverContent>
        </Popover>
    )
}