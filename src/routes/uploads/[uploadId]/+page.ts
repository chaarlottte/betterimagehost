export const load = async ({ params }) => {
    const pbresp = await fetch(`https://bland-gold.pockethost.io/api/collections/uploads/records/${params.uploadId}?expand=uploader`);
    const data = await pbresp.json();

    return {
        uploadData: data,
        imageUrl: `http://localhost:5173/uploads/raw/${params.uploadId}${data.fileExtension}`
    }
}