import {db} from './FBConnection';
import {doc, updateDoc} from "firebase/firestore";

const updateData = async (values, id) => {
    await updateDoc(doc(db, "products", id), values);
}

export default updateData;