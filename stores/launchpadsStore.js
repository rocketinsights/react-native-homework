import { observable, action } from 'mobx';

const LAUNCHPADS_URL = 'https://api.spacexdata.com/v3/launchpads/';

export default class LaunchpadsStore {
    @observable launchpads = [];

    @observable getLaunchpad(id) {
        const [ launchpad ] = this.launchpads.filter(l => l.site_id === id);

        return launchpad;
    }

    @action async loadLaunchpads() {
        this.launchpads = await fetch(LAUNCHPADS_URL).then(r => r.json());
    }
}