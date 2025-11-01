import { useEffect, useState } from "react";

type Props = {
    type?: "INDETERMINATE";
};
export function ProgressBar({}: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleLoading = (e: CustomEvent<boolean>) => setIsLoading(e.detail);
        window.addEventListener("loading", handleLoading as EventListener);
        return () => {
            window.removeEventListener("loading", handleLoading as EventListener);
        };
    }, []);

    return <div className="fixed top-0 left-0 w-full h-[2px] overflow-hidden bg-transparent z-50">{isLoading && <div className="h-full bg-primary/60 animate-indeterminate" />}</div>;
}