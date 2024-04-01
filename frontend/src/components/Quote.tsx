import axios from "axios"
import { useEffect, useState } from "react";
import { QuoteApi_key } from "../config";

async function getQuote() {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
            "X-Api-Key": QuoteApi_key
        }
    })

    return response.data[0];
}

export const Quote = () => {
    let [quote, setquote] = useState("Hope is itself a species of happiness, and perhaps the chief happiness which this world affords.");
    let [author, setauthor] = useState("Jhonson, Samuel")

    useEffect(() => {
        const fetch_quote = async () => {
            const res = await getQuote();

            setquote(res.quote)
            setauthor(res.author)
        }
        fetch_quote();

        const intervalId= setInterval(fetch_quote,10000);

        return () => clearInterval(intervalId)

    }, []);

    return <div className="bg-[#def2f1] invisible lg:visible h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div className="w-3/5">
                <div className="font-semibold text-3xl">
                    "{quote}"
                </div>
                <div className="mt-3 font-medium">
                 ~ {author}
                </div>
            </div>

        </div>
    </div>
}