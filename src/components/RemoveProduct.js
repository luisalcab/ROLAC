import {deleteDoc, doc} from "firebase/firestore";
import { enviromentVariables } from '../../utils/enviromentVariables';

const RemoveProduct = async (id) => {
    const {db} = enviromentVariables;

    await deleteDoc(doc(db, 'products', id));
}

export default RemoveProduct;