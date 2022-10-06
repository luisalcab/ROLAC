import {useState, useEffect ,createContext} from 'react';
import {onSnapshot, collection, doc, deleteDoc, setDoc} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {enviromentVariables} from "../../utils/enviromentVariables"

//Create Context
export const BAMXContext = createContext();

//BAMX provider
export const BAMXProvider = ({children}) => {
    const {db, app} = enviromentVariables;

    const [docsNum, setDocsNum] = useState(null);
    const [docsData, setDocsData] = useState(null);
    const [editRequests, setEditRequests] = useState(null);

    //Number of notifications real time
    useEffect(() => onSnapshot(collection(db, "requests"), collection => {
        setDocsNum(collection.docs.length);
    } ),[]);

    //Gets all data from request
    useEffect(() => onSnapshot(collection(db, "requests"), collection => {
        setDocsData(collection.docs.map(doc => {return {data: doc.data(), id: doc.id}}));
    } ),[]);
    
    //Gets all data from request
    useEffect(() => onSnapshot(collection(db, "edit_requests"), collection => {
        setEditRequests(collection.docs.map(doc => {return {data: doc.data(), id: doc.id}}));
    } ),[]);

    //Deletes a CCRequest document by id
    const delD = async id => await deleteDoc(doc(db, "requests", id));

    //Accepts a new CC user and saves its data 
    const addUser = async (email, data, id) => {
        const auth = getAuth(app);

        //generates a random password
        const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
        
        //Create the user
        const CC = await createUserWithEmailAndPassword(auth, email, password);

        //Add the doc to the collection center collection
        await setDoc(doc(db, "collection_center", CC.user.uid), data);

        //Delete de doc from the request collection
        await deleteDoc(doc(db, "requests", id));
    }

    return(
        <BAMXContext.Provider value={{docsNum, docsData, editRequests, delD, addUser}}>
            {children}
        </BAMXContext.Provider>
    )
}