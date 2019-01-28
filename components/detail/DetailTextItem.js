import React from 'react';
import { AppRegistry, View, Text } from 'react-native';

export default DetailTextItem = ({
    title,
    text
}) => (
    <View style={{ marginBottom: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <Text>{text}</Text>
    </View>
);

