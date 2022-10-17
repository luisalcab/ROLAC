import {collection, getDocs} from "firebase/firestore";
import { enviromentVariables } from '../../utils/enviromentVariables';

const GetProducts = async () => {
    const {db} = enviromentVariables;
    
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
        products.push({...doc.data(), id: doc.id});
    });

    return products;
}

export default GetProducts;