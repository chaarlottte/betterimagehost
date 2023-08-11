import { getRandomString } from "./imageNameUtils"

export const createUploadKey = async (user: any): Promise<string> => {
    const jsonKey = {
        userId: user.id,
        secretKey: await getRandomString(64)
    };

    return Buffer.from(JSON.stringify(jsonKey)).toString("base64");
}

export const decodeUploadKey = async (key: string): Promise<any> => {
    return JSON.parse(Buffer.from(key, "base64").toString("ascii"));
}