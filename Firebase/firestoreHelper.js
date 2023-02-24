import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "./firebase-setup";

export async function writeToDB(goal) {
  try {
    const docRef = await addDoc(collection(firestore, "goals"), goal);
    console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(firestore, "goals", id));
  } catch (err) {
    console.log(err);
  }
}
