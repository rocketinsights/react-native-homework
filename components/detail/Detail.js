import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
import { observer } from 'mobx-react';

@observer
export default class Detail extends Component {
    render() {
        const { launch } = this.props;
        let text = "Select a Launch to view details";

        if (launch) {
            text = launch.details || "No details available yet... Check back later!";
        }

        return (
            <View style={{...this.props.style, ...styles.container}}>
                <Text>{text}</Text>
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