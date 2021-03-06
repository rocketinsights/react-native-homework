import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';
import { observer, inject } from 'mobx-react';
import DetailText from './DetailText';

@inject('appStore', 'launchpadsStore')
@observer
export default class LaunchDetail extends Component {
    render() {
        const { appStore: { selectedLaunch }, launchpadsStore } = this.props;
        
        if (!selectedLaunch) {
            return <View style={styles.noSelection}><Text>Select a Launch to view details</Text></View>;
        }

        const launchpad = launchpadsStore.getLaunchpad(selectedLaunch.launch_site.site_id);
        const {
            latitude,
            longitude
        } = launchpad.location;
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
            title: 'Launch Site'
        };

        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map} region={mapViewRegion}>
                        <MapView.Marker {...marker} />
                    </MapView>
                </View>
                <View style={styles.flightDetails}>
                    <DetailText launch={selectedLaunch} launchpad={launchpad} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 8,
        paddingRight: 4
    },
    mapContainer: {
        flex: 1
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
    },
    noSelection: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});

AppRegistry.registerComponent('LaunchSchedule', () => LaunchDetail);