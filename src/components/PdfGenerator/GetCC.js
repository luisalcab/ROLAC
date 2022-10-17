import FBConnection from '../../contexts/FBConnection';
import {collection, getDocs} from "firebase/firestore";

const GetCC = async() => {
    const querySnapshot = await getDocs(collection(FBConnection.db, "collection_center"));
    const collectionCenter = [];
    querySnapshot.forEach((doc) => {
        const { address, email, name } = doc.data();
        collectionCenter.push({
            id: doc.id,
            address,
            email,
            name
        })
    });

    return collectionCenter;
}

export default GetCC;