import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Image, View, TouchableHighlight } from 'react-native';

export default class ListItem extends Component {
    render() {
        const { 
            mission_name,
            flight_number,
            links: { 
                flickr_images
            },
            launch_site: {
                site_name_long
            }
        } = this.props.launch;
        // const [ thumbnail ] = flickr_images;

        return (
            <TouchableHighlight underlayColor="grey" onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Image style={styles.thumbnail} source={require('../../assets/rocketinsights_logo_mark.png')} />
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
        paddingTop: 8,
        paddingLeft: 16,
        flexDirection: 'column'
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4
    },
    flightNumber: {
        fontWeight: 'normal'
    },
    thumbnail: {
        height: 64,
        width: 64
    }
});

AppRegistry.registerComponent('LaunchSchedule', () => ListItem);