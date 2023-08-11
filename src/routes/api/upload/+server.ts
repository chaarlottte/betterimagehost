import type { RequestHandler, RequestEvent } from "./$types";
import { getRandomFileName } from "$lib/imageNameUtils";
import { writeFile } from "fs/promises";
import { error, json } from "@sveltejs/kit";
import { extname } from "path";
import { decodeUploadKey } from "$lib/authUtils";

export const POST: RequestHandler = async (event: RequestEvent) => {
    const data = await event.request.formData();

    const key = event.request.headers.get("key") as string;
    const file = data.get("file");

    const user = await decodeUploadKey(key);
    
    const response = await event.fetch("https://bland-gold.pockethost.io/api/collections/uploads/records", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            uploader: user.userId,
            originalFilename: (file as File).name,
            fileExtension: extname((file as File).name)
        })
    });

    const { id } = await response.json();

    if(file) {
        // const fileName = await getRandomFileName((file as File));
        const fileName = `${id}${extname((file as File).name)}`
        await writeFile(`./static/uploads/raw/${fileName}`, (file as File).stream());
        return json({
            imageUrl: `http://localhost:5173/uploads/${id}`,
            message: "Successfully uploaded!"
        })
    } else {
        return new Response("bad! >:c");
    }
}