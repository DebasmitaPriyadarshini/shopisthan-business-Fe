import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GoToTop() {
    const loaction = useLocation();
    const routePath = useLocation();
    // const routePath = "";
    const onTop = () => {
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        onTop()
    }, [routePath]);

    return null;
}