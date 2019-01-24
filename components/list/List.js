import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
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
    return (
      <View style={styles.container}>
        {this.props.launches.map((l, i) => <Text key={i}>{i}</Text>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('LaunchSchedule', () => List);