import { observable, action } from "mobx";

const LAUNCHES_URL = 'https://api.spacexdata.com/v3/launches/upcoming';
const ROCKETS_URL = 'https://api.spacexdata.com/v3/rockets';
const LAUNCHPADS_URL = 'https://api.spacexdata.com/v3/launchpads/';

export default class AppStore {
    @observable launches = [];
    @observable selectedLaunch = null;
    @observable rocketImages = {};
    @observable searchText = '';
    @observable sort = 'desc';

    @action async loadAppState() {
        this.launches = await fetch(LAUNCHES_URL)
            .then(r => r.json());

        this.rocketImages = await fetch(ROCKETS_URL)
            .then(r => r.json())
            .then(rs => rs.reduce((o, r) => ({ ...o, [r.rocket_name]: r.flickr_images[0] })));
    }

    @action flipSort() {
        this.sort = this.sort === 'desc' ? 'asc' : 'desc';
    }

    @action setSearchText(text) {
        this.searchText = text;
    }

    @action async selectLaunch(launch) {
        const { launch_site: { site_id: launchpadId } } = launch;
        const launchpad = await fetch(`${LAUNCHPADS_URL}${launchpadId}`).then(r => r.json());
      
        this.selectedLaunch = { ...launch, ...{ launch_site: launchpad } };
    }
}