import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenOrientation } from 'expo';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import fetch from 'cross-fetch';
import List from './components/list';
import Detail from './components/detail';

const { LANDSCAPE } = ScreenOrientation.Orientation;
const appState = observable({
  launches: []
});

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);

    ScreenOrientation.allowAsync(LANDSCAPE);
  }

  componentWillMount() {
    fetch('https://api.spacexdata.com/v3/launches?start=2019-01-01&end=2019-04-30')
      .then(r => r.json())
      .then(ls => appState.launches.push(...ls))
      .then(() => console.log(appState.launches.length));
  }

  render() {
    return (
      <View style={styles.container}>
        <List launches={appState.launches}/>
        <Detail style={styles.detail} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16
  },
  list: {
    flex: 2
  },
  detail: {
    flex: 1
  }
});
