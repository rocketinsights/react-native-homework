import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, View, Text } from 'react-native';
import ListItem from './ListItem';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer
export default class LaunchList extends Component {
  render() {
    const { appStore: { launches } } = this.props;

    if (launches.length === 0) {
      return <View style={styles.loading}><Text>Loading...</Text></View>;
    }

    return (
      <ScrollView>{launches.map(l => <ListItem key={l.flight_number} launch={l} />)}</ScrollView>
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

AppRegistry.registerComponent('LaunchSchedule', () => LaunchList);