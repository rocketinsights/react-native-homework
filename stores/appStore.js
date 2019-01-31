import { observable, action, computed } from "mobx";
import moment from 'moment';

const LAUNCHES_URL = 'https://api.spacexdata.com/v3/launches/upcoming';
const ROCKETS_URL = 'https://api.spacexdata.com/v3/rockets';

function getPessimisticLaunchDate(launch) {
    if (!launch.is_tentative) {
        return moment.utc(launch.launch_date_utc);
    }

    return moment.utc(launch.launch_date_utc).endOf(launch.tentative_max_precision);
}

function launchComparitor(sort) {
    return (a, b) => {
        const first = sort === 'desc' ? a : b;
        const second = first === a ? b : a;
        const dateDiff = getPessimisticLaunchDate(first).diff(getPessimisticLaunchDate(second));

        if (dateDiff !== 0) {
            return dateDiff;
        }

        return first.flight_number - second.flight_number;
    };
}

function launchFilter(searchText) {
    return launch => {
        const filters = searchText.split(' ').map(w => new RegExp(w, 'i'));
        const test = s => filters.some(f => f.test(s));
        return test(launch.mission_name)
            || test(launch.launch_site.site_name_long);
    };
}

export default class AppStore {
    @observable _launches = [];
    @observable selectedLaunch = null;
    @observable rocketImages = {};

    @computed get launches() {
        return this._launches;
    }

    @action async loadAppState() {
        this._launches = await fetch(LAUNCHES_URL)
            .then(r => r.json());

        this.rocketImages = await fetch(ROCKETS_URL)
            .then(r => r.json())
            .then(rs => rs.reduce((o, r) => ({ ...o, [r.rocket_name]: r.flickr_images[0] })));
    }

    @action async selectLaunch(launch) {
        this.selectedLaunch = launch;
    }
}