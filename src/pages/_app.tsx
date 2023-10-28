import "@/styles/globals.css";
import {NextUIProvider, Spinner} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {fontMono, fontSans} from "@/config/fonts";
import type {AppProps} from "next/app";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {Router} from "next/router";
import DefaultLayout from "@/layouts/default";
import {PropagateLoader} from "react-spinners";

const pageVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        scale: .9,
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export default function App({Component, pageProps, router}: AppProps) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Used for page transition
        const start = () => {
            setLoading(true)
        }
        const end = () => {
            setLoading(false)
        }
        Router.events.on("routeChangeStart", start)
        Router.events.on("routeChangeComplete", end)
        Router.events.on("routeChangeError", end)
        return () => {
            Router.events.off("routeChangeStart", start)
            Router.events.off("routeChangeComplete", end)
            Router.events.off("routeChangeError", end)
        }
    }, [])
    return (
        <NextUIProvider>
            <NextThemesProvider>
                <DefaultLayout>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={router.route}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {loading ?
                                <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                                    <PropagateLoader
                                        color="#FF1CF7"
                                        cssOverride={{}}
                                        loading
                                        size={10}
                                        speedMultiplier={1}
                                    />
                                </section>
                                :
                                <Component {...pageProps} />}
                        </motion.div>
                    </AnimatePresence>
                </DefaultLayout>
            </NextThemesProvider>
        </NextUIProvider>
    );
}

export const fonts = {
    sans: fontSans.style.fontFamily,
    mono: fontMono.style.fontFamily,
};
