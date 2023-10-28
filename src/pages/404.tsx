import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Redirect = () => {
    const [sec, setSec] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            if (sec > 0) {
                setSec(sec - 1);
            } else {
                clearInterval(timer);
                window.location.href = "/";
            }
        }, 1000); // Update every 1 second (1000 milliseconds)

        return () => {
            // Cleanup: Clear the interval when the component unmounts
            clearInterval(timer);
        };
    }, [sec]);

    const { error } = useRouter().query;

    const message = sec === 0
        ? "Short URL not found. Redirecting you to the home page."
        : `Short URL not found. Redirecting you to the home page in ${sec} ${sec === 1 ? "second" : "seconds"}.`;

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <p className="text-secondary text-3xl md:text-5xl">{error ? error : "404"}</p>
            <p className="text-secondary text-center">{message}</p>
        </div>
    );
};

export default Redirect;
