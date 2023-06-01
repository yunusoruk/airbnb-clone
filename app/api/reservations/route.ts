import getCurrentUser from "@/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb'


export async function POST(request:any) {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json()

    const{ 
        totalPrice,
        startDate,
        endDate,
        listingId
    } = body

    if(!totalPrice|| !startDate || !endDate || !listingId){
        return NextResponse.error()
    }


    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    startDate: startDate,
                    endDate: endDate,
                    totalPrice: totalPrice,
                    userId: currentUser.id
                }
            }
            
    }
}
)


    return NextResponse.json(listingAndReservation)

}