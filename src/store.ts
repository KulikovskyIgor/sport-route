import { createAppStoreFactoryWithOptions } from "angular2-redux";
import explore from './reducers/explore-page-reducer';

const AppStoreFactory = createAppStoreFactoryWithOptions({
    reducers: {explore},
    debug: true
});

export default AppStoreFactory;
