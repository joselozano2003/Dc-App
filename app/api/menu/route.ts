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

    console.log(link.toString());

    const response = await fetch(link.toString());

    console.log(response);

    if (response.ok) {
        const data = await response.json();
        console.log(data);

        console.log(data);
        return NextResponse.json(data);
    }



    else {
        console.log(response);
        return NextResponse.json({ 
            message : "Error fetching data"
        }, { 
            status: 403 
        });
    }
}