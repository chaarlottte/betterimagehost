import { extname } from "path";

export const getRandomString = async (length: number = 16): Promise<string> => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
}

export const getRandomFileName = async (file: File, length: number = 16): Promise<string> => {
    const randName = await getRandomString(length);
    const fileExtension = extname(file.name);

    return `${randName}${fileExtension}`
}