import {useState, useEffect ,createContext} from 'react';
import {onSnapshot, collection, doc, deleteDoc, setDoc, getDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword, deleteUser, getAuth} from "firebase/auth";
import {enviromentVariables} from "../../utils/enviromentVariables";

//Create Context
export const BAMXContext = createContext();

//BAMX provider
export const BAMXProvider = ({children}) => {
    const {db, app} = enviromentVariables;

    const [CCData, setCCData] = useState(null);
    const [docsNum, setDocsNum] = useState(null);
    const [docsData, setDocsData] = useState(null);
    const [editRequests, setEditRequests] = useState(null);
    const [editRequestsNum, setEditRequestsNum] = useState(null);

    //Effects for requests

    //Number of notifications real time
    useEffect(() => onSnapshot(collection(db, "requests"), collection => {
        setDocsNum(collection.docs.length);
    } ),[]);

    //Gets all data from request
    useEffect(() => onSnapshot(collection(db, "requests"), collection => {
        setDocsData(collection.docs.map(doc => {return {data: doc.data(), id: doc.id}}));
    } ),[]);

    //-------------------------------------------------------------------------------------
    //Effects for edit_requests

    //Number of notifications real time
    useEffect(() => onSnapshot(collection(db, "edit_requests"), collection => {
        setEditRequestsNum(collection.docs.length);
    } ),[]);
    
    //Gets all data from edit_request
    useEffect(() => onSnapshot(collection(db, "edit_requests"), collection => {
        setEditRequests(collection.docs.map(doc => {return {data: doc.data(), id: doc.id}}));
    } ),[]);

    //Deletes a CCRequest document by id
    const delD = async id => await deleteDoc(doc(db, "requests", id));

    //Accepts a new CC user and saves its data 
    const addUser = async (email, data, id) => {
        try{
            const auth = getAuth(app);

            //generates a random password
            const password = "12345678"//Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
            
            //Create the user
            const CC = await createUserWithEmailAndPassword(auth, email, password);

            //Add the doc to the collection center collection
            await setDoc(doc(db, "collection_center", CC.user.uid), data);

            //Delete de doc from the request collection
            await deleteDoc(doc(db, "requests", id));

            //Send an email with the password
            //await sendEmail("a01639784@tec.mx", "Contraseña de BAMX", `${password}\nEsta es la contraseña con la que podras acceder a tu cuenta. Podrás cambiarla más adelante`);
        }catch(error){
            alert("No se pudo agregar el centro en este momento intente mas tarde");
        }
    }

    const getCurrentCC = async uid => (await getDoc(doc(db, "collection_center", uid))).data();

    const setUpdatedCCData = async (uid, id, data) => {
        const d = {
            name: data.name,
            email: data.email,
            address: data.address,
            dates: data.dates,
            latitude: data.latitude,
            longitude: data.longitude
        } 
        await setDoc(doc(db, "collection_center", uid), d);
        await deleteDoc(doc(db, "edit_requests", id));
    }

    //-------------------------------------------------------------------------------------
    //Effects for Dlete CC

    useEffect(() => onSnapshot(collection(db, "collection_center"), collection => {
        setCCData(collection.docs.map(doc => {return {data: doc.data(), id: doc.id}}));
    } ),[]);

    // const delCC = async id => {
    //     getAuth()

    //     await deleteDoc(doc(db, "collection_center", id));
    //     await deleteUser(user)


    // }

    return(
        <BAMXContext.Provider value={{docsNum, docsData, editRequestsNum, editRequests, CCData, delD, addUser, getCurrentCC, setUpdatedCCData}}>
            {children}
        </BAMXContext.Provider>
    )
}