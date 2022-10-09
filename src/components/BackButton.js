import {useState} from "react";
import {Icon, Button} from "@rneui/themed";

const BackButton = ({onPress}) => {
    const [color, setColor] = useState("transparent")

    return(
        <Button
            title=""
            icon={<Icon type="antdesign" name="arrowleft"/>}
            radius="xl"
            onPress={() => {
                setColor("gray");
                setTimeout(() => setColor("transparent"), 1000)
                onPress();
            }}
            buttonStyle={{backgroundColor: color, opacity: .5}}
        />
    )
}

export default BackButton;
