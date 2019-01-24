import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, View, Text } from 'react-native';
import ListItem from './ListItem';
import { observer } from 'mobx-react';

@observer
export default class List extends Component {
  constructor(props = {
    launches: []
  }) {
    super(props);
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
    const { launches, selectedLaunch } = this.props;

    if (launches.length === 0) {
      return <View style={styles.loading}><Text>Loading...</Text></View>;
    }

    return (
      <ScrollView>
        {launches.map(l => (
          <ListItem
            onPress={() => this.props.onLaunchPress(l)}
            key={l.flight_number}
            launch={l}
            selected={selectedLaunch && selectedLaunch.flight_number === l.flight_number}
            thumbnail={this._getThumbnail(l.rocket.rocket_name)} />))}
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