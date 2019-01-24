import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';
import { observer } from 'mobx-react';
import DetailText from './DetailText';

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
        const mapViewRegion = {
            latitude,
            longitude,
            latitudeDelta: 5,
            longitudeDelta: 5
        };
        const marker = {
            coordinate: {
                latitude,
                longitude
            },
            title: "Launch Site",
            description: ""
        };

        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        region={mapViewRegion}
                    >
                        <MapView.Marker {...marker} />
                    </MapView>
                </View>
                <View style={styles.flightDetails}>
                    <DetailText launch={launch} />
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