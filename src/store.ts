import { createAppStoreFactoryWithOptions } from "angular2-redux";
import explore from './reducers/explore-page-reducer';
import app from './reducers/app-reducer';

const AppStoreFactory = createAppStoreFactoryWithOptions({
    reducers: {
        app,
        explore
    }
});

export default AppStoreFactory;
