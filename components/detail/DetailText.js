import React, { Component } from 'react';
import { ScrollView, AppRegistry } from 'react-native';
import moment from 'moment';
import DetailTextItem from './DetailTextItem';

const formats = {
    default: 'MMM Do YYYY, h:mm A',
    hour: 'MMM Do YYYY, h A',
    day: 'MMM Do YYYY',
    month: 'MMMM YYYY',
    quarter: '[Q]Q YYYY',
    year: 'YYYY'
};

export default class DetailText extends Component {
    getLaunchTimestamp() {
        const { launch } = this.props;
        const precision = launch.tentative_max_precision;
        const launchDate = moment.utc(launch.launch_date_utc);
        const dateFormat = launch.is_tentative ? formats[precision] : formats.default;

        if (precision === 'half') {
            const which = launchDate.month() < 6 ? 'First' : 'Second';

            return `${which} half of ${launchDate.year()}`;
        }

        return launchDate.format(dateFormat);
    }

    render() {
        const { launch } = this.props;
        const launchTimestamp = this.getLaunchTimestamp();
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

AppRegistry.registerComponent('LaunchSchedule', () => DetailText);