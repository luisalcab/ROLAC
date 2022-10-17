import {doc, updateDoc} from "firebase/firestore";
import { enviromentVariables } from '../../utils/enviromentVariables';

const updateData = async (values, id) => {
    const {db} = enviromentVariables;

    await updateDoc(doc(db, "products", id), values);
}

export default updateData;