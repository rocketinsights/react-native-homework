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

  render() {
    const { launches } = this.props;
    
    if (launches.length === 0) {
      return <View style={styles.loading}><Text>Loading...</Text></View>;
    }

    return (
      <View style={this.props.style}>
        <ScrollView>
          {launches.map(l => <ListItem key={l.flight_number} launch={l} />)}
        </ScrollView>
      </View>
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