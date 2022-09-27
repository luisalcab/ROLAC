import {db} from '../contexts/FBConnection';
import {collection, getDocs} from "firebase/firestore";

const GetProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
        const {name, cost, urgent, imageURL, active, unit} = doc.data();
        products.push({
            id: doc.id,
            imageURL,
            name,
            cost,
            urgent,
            active,
            unit
        });
    });
    return products;
}

export default GetProducts;