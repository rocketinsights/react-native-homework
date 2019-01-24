import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, View, Text } from 'react-native';
import ListItem from './ListItem';
import { observer } from 'mobx-react';
import moment from 'moment';

function getPessimisticLaunchDate(launch) {
  if (!launch.is_tentative) {
    return moment.utc(launch.launch_date_utc);
  }

  return moment.utc(launch.launch_date_utc).endOf(launch.tentative_max_precision);
}

const comparitors = {
  desc(a, b) {
    const dateDiff = getPessimisticLaunchDate(a).diff(getPessimisticLaunchDate(b));

    if (dateDiff !== 0) {
      return dateDiff;
    }

    return a.flight_number - b.flight_number;
  },
  asc(a, b) {
    const dateDiff = getPessimisticLaunchDate(b).diff(getPessimisticLaunchDate(a));

    if (dateDiff !== 0) {
      return dateDiff;
    }

    return b.flight_number - a.flight_number;
  }
};

@observer
export default class List extends Component {
  constructor(props) {
    super(props);
  }

  _passesFilter(launch) {
    const filters = this.props.filter.split(' ').map(w => new RegExp(w, 'i'));
    const test = s => filters.some(f => f.test(s));
    return test(launch.mission_name)
        || test(launch.launch_site.site_name_long);
  }

  _getThumbnail(name) {
    const uri = this.props.images[name];

    if (uri) {
      return { uri };
    } else {
      return require('../../assets/rocketinsights_logo_mark.png');
    }
  }

  render() {
    const { launches, selectedLaunch, sort } = this.props;
    const renderItem = l => (
      <ListItem
        onPress={() => this.props.onLaunchPress(l)}
        key={l.flight_number}
        launch={l}
        selected={selectedLaunch && selectedLaunch.flight_number === l.flight_number}
        thumbnail={this._getThumbnail(l.rocket.rocket_name)} />
    );

    if (launches.length === 0) {
      return <View style={styles.loading}><Text>Loading...</Text></View>;
    }

    return (
      <ScrollView>
        {launches.filter(l => this._passesFilter(l)).sort(comparitors[sort]).map(renderItem)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('LaunchSchedule', () => List);