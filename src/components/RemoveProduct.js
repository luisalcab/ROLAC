import {db} from './FBConnection';
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";

const RemoveProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
}

export default RemoveProduct;