import * as React from 'react';
import {View,Text} from 'react-native';

export default function PostTaskScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the PostTask Screen')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>PostTask Screen</Text>
        </View>
    );
}