import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';
import { observer } from 'mobx-react';

@observer
export default class Detail extends Component {
    render() {
        const { launch } = this.props;

        if (!launch) {
            return <Text>Select a Launch to view details</Text>;
        }

        const text =  launch.details || "No details available yet... Check back later!";
        const {
            launch_site: {
                location: {
                    latitude,
                    longitude
                }
            }
        } = launch;

        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude,
                            longitude,
                            latitudeDelta: 10,
                            longitudeDelta: 10
                        }}
                    />
                </View>
                <View style={styles.flightDetails}>
                    <Text>{text}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingRight: 4
    },
    mapContainer: {
        flex: 1,
        padding: 4
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        left: 4 // padding doesn't work because of above helper
    },
    flightDetails: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 16
    }
});

AppRegistry.registerComponent('LaunchSchedule', () => Detail);