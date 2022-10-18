import {collection, addDoc} from "firebase/firestore";
import { enviromentVariables } from '../../utils/enviromentVariables';

const uploadData = async (values) => {
    const {db} = enviromentVariables;

    const docRef = await addDoc(collection(db, "products"), values);
    console.log("Document written with ID: ", docRef.id);
}

export default uploadData;