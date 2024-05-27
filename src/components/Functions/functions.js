import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

async function linkCreated(userUid, linkID, longURL, shortURL) {
  try {
    await setDoc(doc(db, `links/${shortURL}`), {
      userUid,
      linkID,
      longURL,
    });
    console.log(`Document successfully written for shortURL: ${shortURL}`);
  } catch (error) {
    console.error("Error writing document: ", error);
    throw new Error("Error writing document");
  }
}

// Example usage:
// linkCreated('user123', 'link456', 'https://example.com', 'short123');
