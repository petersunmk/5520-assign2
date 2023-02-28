import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "./firebase-setup";

//write and delte data from firestore

export async function writeToDB(goal) {
  try {
    const docRef = await addDoc(collection(firestore, "goals"), goal);

    return docRef;
  } catch (err) {
    throw new Error("Error writing document: " + err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(firestore, "goals", id));
  } catch (err) {
    throw new Error("Error deleting document: " + err);
  }
}
