import AppStore from './appStore';
import LaunchpadsStore from './launchpadsStore';

const appStore = new AppStore();
const launchpadsStore = new LaunchpadsStore();

appStore.loadAppState();
launchpadsStore.loadLaunchpads();

export default {
    appStore,
    launchpadsStore
};