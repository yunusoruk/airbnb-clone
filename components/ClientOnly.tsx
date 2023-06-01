'use client';

import { FC, useState, useEffect } from 'react';


interface ClientOnlyProps {
    children: React.ReactNode
}

const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {

    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return null;
    }


    return (
        <>
            {children}
        </>
    );
}
export default ClientOnly;