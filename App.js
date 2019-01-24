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
  launches: [],
  selectedLaunch: null,
  rocketImages: {}
});

async function getLaunchDetail(launch) {
  const { launch_site: { site_id: launchpadId } } = launch;
  const launchpad = await fetch(`https://api.spacexdata.com/v3/launchpads/${launchpadId}`).then(r => r.json());

  return { ...launch, ...{ launch_site: launchpad } };
}

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);

    ScreenOrientation.allowAsync(LANDSCAPE);
  }

  componentWillMount() {
    fetch('https://api.spacexdata.com/v3/launches/upcoming')
      .then(r => r.json())
      .then(ls => appState.launches.push(...ls))
      .then(() => console.log(appState.launches.length));

    fetch('https://api.spacexdata.com/v3/rockets')
      .then(r => r.json())
      .then(rs => rs.map(r => ({ rocket: r.rocket_name, imageUrl: r.flickr_images[0] })))
      .then(rs => appState.rocketImages = rs.reduce((o, r) => ({ ...o, [r.rocket]: r.imageUrl })));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <List
            launches={appState.launches}
            images={appState.rocketImages}
            selectedLaunch={appState.selectedLaunch}
            onLaunchPress={async l => appState.selectedLaunch = await getLaunchDetail(l)}
          />
        </View>
        <View style={styles.detail}>
          <Detail launch={appState.selectedLaunch} />
        </View>
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
    flex: 3
  },
  detail: {
    flex: 2
  }
});
