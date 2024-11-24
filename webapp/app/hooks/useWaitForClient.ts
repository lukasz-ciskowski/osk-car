import { useEffect, useState } from 'react';

export function useWaitForClient() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, []);
    return show;
}
