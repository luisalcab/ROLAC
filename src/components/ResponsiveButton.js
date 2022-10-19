import React from "react";
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';

const ResponsiveButton = ({callback, icon, title, styles}) => {
    return (
        <TouchableOpacity onPress={callback} style={[{flexDirection: "row"}, styles.container]}>
            <Icon name={icon}></Icon>
            <Text style={[styles.title]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ResponsiveButton;