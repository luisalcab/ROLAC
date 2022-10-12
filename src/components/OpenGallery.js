import * as ImagePicker from 'expo-image-picker';

const openGallery = async (setImage) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.photos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        
        if (!pickerResult.cancelled) {
            setImage(pickerResult.uri);
        }
    }
}

export default openGallery;