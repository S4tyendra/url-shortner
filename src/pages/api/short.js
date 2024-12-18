import clientPromise from "../../lib/mongodb";
import validUrl from "valid-url";

export default async function handler(req, res) {
    const client = await clientPromise;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Or specific origin if needed
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Respond to preflight requests
        res.status(200).end();
        return;
    }
    
    try {
        const db = client.db("urlShortener");
        switch (req.method) {
            case "POST":
                const { originalUrl } = req.body;
                if (originalUrl && validUrl.isUri(originalUrl)) {
                    const randomStr = getRandomString(5);
                    const shortUrl = `https://s.devh.in/${randomStr}`;
                    await db.collection("shortenedUrls").insertOne({
                        _id: randomStr,
                        originalUrl,
                    });
                    res.status(200).json({ shortUrl });
                } else {
                    res.status(400).json({ error: "Invalid URL or Bad Request" });
                }
                break;
            default:
                res.status(405).end();
                break;
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

function getRandomString(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset.charAt(randomIndex);
    }
    return randomString;
}
