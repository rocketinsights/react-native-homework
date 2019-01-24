import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Image, View, TouchableHighlight } from 'react-native';

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
        let style = styles.container;

        if (this.props.selected) {
            style = { ...style, ...styles.selected };
        }

        return (
            <TouchableHighlight underlayColor="grey" onPress={this.props.onPress}>
                <View style={style}>
                    <Image style={styles.thumbnail} source={this.props.thumbnail} />
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
        paddingHorizontal: 8,
        flexDirection: 'row'
    },
    selected: {
        borderLeftWidth: 4,
        borderLeftColor: '#005288',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        paddingLeft: 4
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