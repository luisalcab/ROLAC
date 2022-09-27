import {db} from '../contexts/FBConnection';
import {collection, getDocs} from "firebase/firestore";

const GetProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
        products.push({...doc.data(), id: doc.id});
    });
    return products;
}

export default GetProducts;