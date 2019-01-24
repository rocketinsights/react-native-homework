import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';

export default class ListItem extends Component {
    constructor(props = {
        launch: {
            details,
            flight_number,
            links: {
                flikr_images
            },
            launch_site: {
                site_name_long
            }
        }
    }) {
        super(props);

        consol;
    }

    render() {
        const { site_name_long: siteName } = this.props.launch_site;
        const { flight_number: flightNumber } = this.props;
        return (
            <Text>{siteName} ({flightNumber})</Text>
        );
    }
}

AppRegistry.registerComponent('LaunchSchedule', () => ListItem);