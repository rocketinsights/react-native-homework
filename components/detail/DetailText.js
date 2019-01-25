import React, { Component } from 'react';
import { ScrollView, Text, AppRegistry, StyleSheet } from 'react-native';
import moment from 'moment';

const formats = {
    default: 'MMM Do YYYY, h:mm A',
    hour: 'MMM Do YYYY, h A',
    day: 'MMM Do YYYY',
    month: 'MMMM YYYY',
    quarter: '[Q]Q YYYY'
};

export default class DetailText extends Component {
    render() {
        const { launch } = this.props;
        const launchDate = moment.utc(launch.launch_date_utc);
        const dateFormat = launch.is_tentative ? formats[launch.tentative_max_precision] : formats.default;
        const launchTimestamp = launchDate.format(dateFormat);
        const launchDetails = launch.details || 'No details available yet. Check back later!';
        return (
            <ScrollView>
                <Text style={styles.label}>Launch Date</Text>
                <Text style={styles.text}>{launchTimestamp}</Text>

                <Text style={styles.label}>Rocket Class</Text>
                <Text style={styles.text}>{launch.rocket.rocket_name}</Text>

                <Text style={styles.label}>Launch Info</Text>
                <Text style={styles.text}>{launchDetails}</Text>

                <Text style={styles.label}>About the Launch Site</Text>
                <Text style={styles.text}>{launch.launch_site.details}</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold'
    },
    text: {
        marginBottom: 8
    }
});

AppRegistry.registerComponent('LaunchSchedule', () => DetailText);