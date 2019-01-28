import React, { Component } from 'react';
import { ScrollView, Text, AppRegistry, StyleSheet } from 'react-native';
import moment from 'moment';
import DetailTextItem from './DetailTextItem';

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
            <DetailTextItem title='Launch Date' text={launchTimestamp} />
            <DetailTextItem title='Rocket Class' text={launch.rocket.rocket_name} />
            <DetailTextItem title='Launch Info' text={launchDetails} />
            <DetailTextItem title='About the Launch Site' text={launch.launch_site.details} />
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