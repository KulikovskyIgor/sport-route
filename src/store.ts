import { createAppStoreFactoryWithOptions } from 'angular2-redux';
import explore from './reducers/explore-page-reducer';
import home from './reducers/home-page-reducer';
import app from './reducers/app-reducer';

const AppStoreFactory = createAppStoreFactoryWithOptions({
    reducers: {
        app,
        explore,
        home
    }
});

export default AppStoreFactory;
