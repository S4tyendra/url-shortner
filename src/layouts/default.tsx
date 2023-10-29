// import {Link} from "@nextui-org/link";
import {Head} from "./head";
import React from "react";

export default function DefaultLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
            <div className="relative flex flex-col h-screen bg-black ">
                <Head/>
                <main className="container mx-auto max-w-7xl px-6 flex-grow bg-black">
                    {children}
                </main>
                <footer className="w-full flex items-center justify-center py-3 bg-black">
                    <a
                        className="flex items-center gap-1 text-current"
                        href="https://satya.devh.in/"
                        title="nextui.org homepage"
                        target="_blank"
                    >
                        <span className="text-default-600">Made by</span>
                        <p className="text-primary">Satyendra</p>
                    </a>
                </footer>
            </div>
    );
}
