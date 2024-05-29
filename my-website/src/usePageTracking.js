import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag('config', 'UA-315439340-1', {
                page_path: location.pathname,
            });
        }
    }, [location]);
};

export default usePageTracking;
