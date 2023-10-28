import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const { slug } = req.query;
    const client = await clientPromise;

    try {
        const db = client.db("urlShortener");
        const shortenedUrl = await db.collection("shortenedUrls").findOne({ _id: slug });

        if (shortenedUrl) {
            res.writeHead(302, { Location: shortenedUrl.originalUrl });
            res.end();
        } else {
            res.writeHead(307, { Location: "/404?error=URL NOT FOUND" });
            res.end();

        }
    } catch (error) {
        res.writeHead(307, { Location: "/404?error="+error.message.toString() });
        res.end();

    }
};
