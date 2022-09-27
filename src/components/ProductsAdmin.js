import React, {useState, useEffect} from 'react';
import GetProducts from './GetProducts';
import { View, Text} from 'react-native';

const ProductsAdmin = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(GetProducts());
        console.log(products);
    }, []);

    return (
        <View>
            <Text>Products Admin</Text>

        </View>
    );
}

export default ProductsAdmin;