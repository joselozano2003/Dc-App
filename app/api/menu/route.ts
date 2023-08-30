import { NextResponse, NextRequest } from "next/server";

import { createLink } from "@/lib/functions";

export async function GET(req: NextRequest) {
    const date = req.nextUrl.searchParams.get("date");
    const period = req.nextUrl.searchParams.get("period");

    if (!date || !period) {
        return NextResponse.json({ 
            message : "No date or period provided"
        }, { 
            status: 403 
        });
    }

    const link = createLink(date, period);

    const response = await fetch(link.toString());

    if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
    }

    else {
        return NextResponse.json({ 
            message : "Error fetching data"
        }, { 
            status: 403 
        });
    }
}