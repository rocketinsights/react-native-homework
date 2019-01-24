import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { ScreenOrientation } from 'expo';
import { observable } from 'mobx';
import { observer, componentByNodeRegistry } from 'mobx-react';
import fetch from 'cross-fetch';
import List from './components/list';
import Detail from './components/detail';

const { LANDSCAPE } = ScreenOrientation.Orientation;
const appState = observable({
  launches: [],
  selectedLaunch: null,
  rocketImages: {},
  searchText: '',
  sort: 'desc'
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

  _flipSort() {
    const newSort = appState.sort === 'asc' ? 'desc' : 'asc';

    appState.sort = newSort;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <View style={styles.searchSortContainer}>
            <TextInput
              style={styles.search}
              placeholder="Filter..."
              onChangeText={t => appState.searchText = t} />
            <Text style={styles.sort} onPress={this._flipSort}>Launch Date {(appState.sort === 'asc' ? '⬇' : '⬆')}</Text>
          </View>
          <List
            launches={appState.launches}
            images={appState.rocketImages}
            filter={appState.searchText}
            sort={appState.sort}
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
  },
  search: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 8,
    borderRadius: 2,
    width: 256
  },
  searchSortContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sort: {
    paddingLeft: 16
  }
});
