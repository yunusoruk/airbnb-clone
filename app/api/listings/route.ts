import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request:any) {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json()

    const{ 
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        title,
        description
    } = body

    Object.keys(body).forEach((value: any) => {
        if(!body[value]){
            return NextResponse.error()
        }
    })

    const listing = await prisma.listing.create({
        data: {category,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        title,
        description,
        locationValue: location.value,
        price: parseInt(price,10),
        userId: currentUser.id}
    }
)


    return NextResponse.json(listing)

}