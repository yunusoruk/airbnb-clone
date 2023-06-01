'use client'

import EmptyState from '@/components/EmptyState';
import { FC, useEffect } from 'react';

interface ErrorStateProps {
    error: Error
}

const ErrorState: FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(() => {
        console.log(error);

    }, [error])

    return (
        <EmptyState
            title='Uh..'
            subtitle='Something went wrong.'
        />
    );
}
export default ErrorState;