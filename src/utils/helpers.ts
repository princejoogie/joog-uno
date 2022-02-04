import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "./database";

export interface UrlItem {
  url: string;
  tag: string;
}

export const tagExists = async (tag: string) => {
  const docRef = doc(db, "urls", tag.trim());
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

export const getUrlItem = async (url: string): Promise<UrlItem | null> => {
  const urlsRef = collection(db, "urls");
  const q = query(urlsRef, where("url", "==", url.trim()));
  const docSnaps = await getDocs(q);

  if (docSnaps.docs.length > 0) {
    return docSnaps.docs[0].data() as UrlItem;
  }

  return null;
};

export const generateRandomTag = async (): Promise<string> => {
  let result = "";
  const length = 6;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  if (await tagExists(result)) return generateRandomTag();

  return result;
};

export const createLink = async (url: string, tag: string): Promise<UrlItem> => {
  const _url = await getUrlItem(url);
  if (_url) return _url;

  const exists = await tagExists(tag);
  if (exists) throw new Error("Tag already exists");

  const docRef = doc(db, "urls", tag.trim());
  try {
    await setDoc(docRef, { url: url.trim(), tag: tag.trim() });
    const data = await getDoc(docRef);
    return data.data() as UrlItem;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    throw new Error("Error creating link");
  }
};
