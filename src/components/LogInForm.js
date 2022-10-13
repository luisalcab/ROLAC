import {useContext} from 'react';
import {View} from 'react-native';
import {Input, Icon, Button} from "@rneui/themed";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getDoc, doc} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import firebaseConection from "../contexts/FBConnection"
import { UserInformation } from '../contexts/userInformation';

const LogInForm = ({navigation}) => {

    const {userInformation, setUserInformation} = useContext(UserInformation);

    const auth = getAuth();

    const nav2Registration = () => {
        navigation.navigate("RegisterDonor");
    }

    const logInSchema = Yup.object().shape({
        email:Yup.
            string().
            email("Email no valido").
			required("Email requerido"),
        password:Yup.
            string().
            required("Contraseña requerida")
    })

    const handleSubmit = async(data) => {
        const {email, password} = data;
        await signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
            const querySnapshotDonor = await getDoc(doc(firebaseConection.db, "donor", auth.currentUser.uid))
            if(querySnapshotDonor.exists()){
                const { lastName, name } = querySnapshotDonor.data();
                setUserInformation({
                    auth: auth,
                    uid: auth.currentUser.uid,
                    name: name,
                    lastName: lastName
                });

                navigation.navigate("HomePageDonor", {navigation: navigation});
            } else {
                const querySnapshotCollectionCenter = await getDoc(doc(firebaseConection.db, "collection_center", auth.currentUser.uid))
                if(querySnapshotCollectionCenter.exists()){
                    navigation.navigate("HomePageCollectionCenter", {navigation: navigation});
                } else {
                    const querySnapshotManger = await getDoc(doc(firebaseConection.db, "BAMXmanager", auth.currentUser.uid))
                    if(querySnapshotManger.exists()){
                        const { lastName, name } = querySnapshotManger.data();
                        setUserInformation({
                            auth: auth,
                            uid: auth.currentUser.uid,
                            name: name,
                            lastName: lastName
                        });
        
                        navigation.navigate("HomePageManagerBAMX", {navigation: navigation});
                    } else {
                        alert("Usuario o contraseña incorrectas");

                    }
                }
            }
        })
        .catch((e) => {
            alert("Usuario o contraseña incorrectas");
        });
    }
  return (
    <>
        <Formik
            initialValues={{
                email:"",
                password:""
            }}
            onSubmit={(values, {resetForm}) => {
                handleSubmit(values);
                resetForm();
            }}
            validationSchema={logInSchema}
            >
                {({errors, touched, handleChange, handleSubmit, values}) => {
                    return(
                        <>
                            <Input
                                placeholder="Correo"
                                leftIcon={<Icon type="material" name="mail"/>}
                                onChangeText={handleChange("email")}
                                errorMessage={errors.email && touched.email ? errors.email : ""}
                                style={{width:"100%",height:20}}
                                value={values.email}
                            />
                            <Input
                                placeholder="Contraseña"
                                secureTextEntry={true}
                                leftIcon={<Icon type="material" name="lock"/>}
                                onChangeText={handleChange("password")}
                                errorMessage={errors.password && touched.password ? errors.password : ""}
                                style={{width:"100%",height:20}}
                                value={values.password}
                            />
                            <View style={{flex:1, justifyContent:"space-around", alignItems:"center", flexDirection:"column"}}>    
                                <Button 
                                    onPress={handleSubmit} 
                                    title="Submit"
                                    buttonStyle={{
                                        width: "80%",
                                        height:50,
                                        borderBottomEndRadius:10,
                                        borderBottomLeftRadius:10,
                                        backgroundColor:"gray"
                                    }}
                                    titleStyle={{
                                        width: "100%"
                                    }}
                                    icon={<Icon name="arrow-forward-ios" type="material"/>}
                                    iconRight={true}
                                />
                                <Button 
                                    onPress={nav2Registration} 
                                    title="Registrarse"
                                    buttonStyle={{
                                        width: "80%",
                                        height:50,
                                        borderBottomEndRadius:10,
                                        borderBottomLeftRadius:10,
                                        backgroundColor:"gray"
                                    }}
                                    titleStyle={{
                                        width: "100%"
                                    }}
                                    icon={<Icon name="arrow-forward-ios" type="material"/>}
                                    iconRight={true}
                                />
                            </View>
                        </>
                    )
                }}
            </Formik>    
        </>
    )
}

export default LogInForm