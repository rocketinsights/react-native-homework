import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';

export default class Detail extends Component {
    render() {
        return (
            <View style={{...this.props.style, ...styles.container}}>
                <Text>Details over here</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('LaunchSchedule', () => Detail);