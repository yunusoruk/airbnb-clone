'use client'

import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';
import Heading from '@/components/navbar/Heading';
import { SafeReservation, SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

interface ReservationsClientProps {
    reservations: SafeReservation[]
    currentUser?: SafeUser | null
}

const ReservationsClient: FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    //router
    const router = useRouter()

    const [deletingId, setDeletingId] = useState('')
    //onCancel and states

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled')
                router.refresh()
            })
            .catch((error) => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setDeletingId('')
            })
    }, [router])
    //container heading listingcard

    return (
        <Container>
            <Heading
                title='Reservations'
                subtitle='Booking on your properties'
            />
            <div
                className='
                    mt-10
                    grid
                    grid-cols-1
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-5 
                    2xl:grid-cols-6 
                    gap-8
                '
            >
                {reservations.map((reservation: any) => (
                    <ListingCard
                        reservation={reservation}
                        data={reservation.listing}
                        key={reservation.id}
                        disabled={reservation.id === deletingId}
                        actionId={reservation.id}
                        onAction={onCancel}
                        actionLabel='Cancel guest reservation'
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}
export default ReservationsClient;