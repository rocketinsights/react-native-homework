import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Image, View, TouchableHighlight } from 'react-native';

function getThumbnail(launch) {
    const {
        links: {
            flickr_images
        }
    } = launch;

    if (flickr_images.length === 0) {
        return require('../../assets/rocketinsights_logo_mark.png');
    } else {
        return { uri: flickr_images[0] };
    }    
}

export default class ListItem extends Component {
    render() {
        const launch = this.props.launch;
        const { 
            mission_name,
            flight_number,
            launch_site: {
                site_name_long
            }
        } = launch;

        return (
            <TouchableHighlight underlayColor="grey" onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Image style={styles.thumbnail} source={getThumbnail(launch)} />
                    <View style={styles.launchInfo}>
                        <Text style={styles.title}>
                            {mission_name}
                            <Text style={styles.flightNumber}> (#{flight_number})</Text>
                        </Text>
                        <Text>
                            {site_name_long}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        paddingVertical: 20,
        flexDirection: 'row'
    },
    launchInfo: {
        paddingLeft: 16,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 16
    },
    flightNumber: {
        fontWeight: 'normal'
    },
    thumbnail: {
        height: 96,
        width: 96
    }
});

AppRegistry.registerComponent('LaunchSchedule', () => ListItem);