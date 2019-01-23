import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { excitement: '' };
  }

  getExcited() {
    this.setState({ excitement: this.state.excitement + '!' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello, world{this.state.excitement}</Text>
        <Button title='Get Excited' onPress={() => this.getExcited()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
