import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, View, Text } from 'react-native';
import ListItem from './ListItem';
import { observer, inject } from 'mobx-react';
import moment from 'moment';


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

@inject('appStore')
@observer
export default class List extends Component {
  _getThumbnail(name) {
    const uri = this.props.appStore.rocketImages[name];

    if (uri) {
      return { uri };
    } else {
      return require('../../assets/rocketinsights_logo_mark.png');
    }
  }

  render() {
    const { appStore, appStore: { launches, selectedLaunch } } = this.props;

    const renderItem = l => (
      <ListItem
        onPress={() => appStore.selectLaunch(l)}
        key={l.flight_number}
        launch={l}
        selected={selectedLaunch && selectedLaunch.flight_number === l.flight_number}
        thumbnail={this._getThumbnail(l.rocket.rocket_name)} />
    );

    if (launches.length === 0) {
      return <View style={styles.loading}><Text>Loading...</Text></View>;
    }

    return (
      <ScrollView>{launches.map(renderItem)}</ScrollView>
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