"use strict";

import { useEffect } from 'react';
import { useRouter } from 'next/router';


const RedirectPage = () => {
    const router = useRouter();

    useEffect(() => {
        const { slug } = router.query;
        if (slug === undefined) return;
        router.push(`/api/${slug}`);
    }, [router]);

    return null;
};

export default RedirectPage;
