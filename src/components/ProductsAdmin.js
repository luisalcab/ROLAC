import React, {useState, useEffect} from 'react';
import GetProducts from './GetProducts';
import { View, Text} from 'react-native';

const ProductsAdmin = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        GetProducts().then((products) => {
            setProducts(products);
            console.log(products);
        });
    }, []);

    return (
        <View>
            <Text>Products Admin</Text>
            {products.map((product) => (
                <Text key={product.id}>{product.values.name}</Text>
            ))}
        </View>
    );
}

export default ProductsAdmin;