import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Icon} from '@iconify/react';

const Redirect = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const handleShorten = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/short', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({originalUrl: originalUrl}),
            });

            if (response.ok) {
                const data = await response.json();
                setShortenedUrl(data.shortUrl);
                setLoading(false);
                setLoaded(true);
                setError('');

            } else {
                const errorData = await response.json();
                setError(errorData.error);
                console.error('Shortening URL failed:', errorData.error);
                setLoading(false);
            }
        } catch (error: any) {
            // Handle network errors here
            setError(error.message);
            console.error('Network error:', error);
            setLoading(false);
        }
    };


    const handleShortenNew = () => {
        setLoading(false);
        setLoaded(false);
        setOriginalUrl('');
        setShortenedUrl('');
        setCopied(false);
        setError('');
    }

    const handleCopy = async () => {
        setLoading(true);
        const tempInput = document.createElement("input");
        tempInput.value = shortenedUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        setLoading(false);
        setCopied(true);
    };

    return (<div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <section className="w-full h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 items-center">
                        <div className="flex flex-col justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                    URL Shortener
                                </h1>
                                <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
                                    Enter a long URL and get a shortened link in seconds.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2 mx-auto">
                                <div className="flex space-x-2">
                                    <Input
                                        disabled={loaded ? loaded : loading}
                                        className="max-w-lg flex-1 bg-gray-800 text-white border-gray-900"
                                        type="url"
                                        placeholder="Enter your URL"
                                        value={loading ? "Processing.." : loaded ? shortenedUrl : originalUrl}
                                        onChange={(e) => setOriginalUrl(e.target.value)}
                                    />
                                    {loaded ? (<>
                                            <Button onClick={handleCopy} disabled={loading}
                                                    className="bg-white text-black">
                                                {loading ? 'Please Wait' : copied ? (
                                                    <Icon className="h-8 w-8 p-1" icon="line-md:clipboard-check"/>) : (
                                                    <Icon className="h-8 w-8 p-1" icon="line-md:clipboard-arrow"/>)}
                                            </Button>

                                            <Button onClick={() => {
                                                window.open(shortenedUrl, '_blank');
                                            }} disabled={loading} className="bg-white text-black">
                                                <Icon className="h-8 w-8 p-1" icon="line-md:external-link-rounded"/>
                                            </Button>
                                        </>) : (<Button onClick={handleShorten} disabled={loading}
                                                        className="bg-white text-black">
                                            {loading ? (
                                                <Icon className="h-8 w-8 p-1" icon="line-md:loading-twotone-loop"/>) : (
                                                <Icon className="h-8 w-8 p-1"
                                                      icon="line-md:chevron-small-double-right"/>)}
                                        </Button>)}
                                </div>

                                {error === '' ? (
                                    <p className="text-xs text-zinc-200 dark:text-zinc-100">
                                        Get ready to shorten your long URLs and share them easily.
                                    </p>) : (<div className="text-xs text-zinc-200 dark:text-zinc-100">
                                    <span className="text-red-500">{error}</span>
                                </div>)}
                                {loaded ? (<Button onClick={handleShortenNew} disabled={loading}
                                                   className="bg-white text-black">
                                        Shorten a New URL
                                    </Button>) : (<></>)}
                                <div className="flex items-center justify-center space-x-2">
                                <Button className='mx-1 text-xl mt-10' onClick={
                                    () => window.open('https://github.com/S4tyendra/url-shortner', '_blank')
                                }>
                                    <Icon icon="line-md:github-loop" className="h-8 w-8 m-1" /> GitHub Repo
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>);
};

export default Redirect;

