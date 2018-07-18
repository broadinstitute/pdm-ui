import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import * as actions from '../../actions/providers';
import * as types from '../../actions/types';

const mockProviderA = { id: 1, name: "Provider A" };
const mockProviderB = { id: 2, name: "Provider B" };
const mockProfile = { id: 3, name: "Profile A" };

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('providers actions', () => {
  // ----------------------- LOAD PROVIDERS -------------------------------- //
  describe('should handle loading providers', () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });

    it('should create LOAD_PROVIDERS_SUCCESS after successfully loading providers', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: [ mockProviderA, mockProviderB ] });
      });

      const store = mockStore({ providers: [], auth: { accessToken: 'abc' } });
      const expectedActions = [
        { type: types.PROVIDERS_REQUEST },
        { type: types.LOAD_PROVIDERS_SUCCESS, providers: [ mockProviderA, mockProviderB ] }
      ];

      return store.dispatch(actions.loadProviders()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  // ----------------------- LINK PROVIDER --------------------------------- //
  describe('should handle linking a provider', () => {
    beforeEach(() => { moxios.install(); });
    afterEach(() => { moxios.uninstall(); });

    it('should create LINK_PROVIDER_SUCCESS after successfully linking a provider', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200 });
      });

      const store = mockStore({
        profiles: [ mockProfile ],
        providers: [ mockProviderA ],
        auth: { accessToken: 'abc' }
      });
      const expectedActions = [
        { type: types.LINK_PROVIDER_REQUEST },
        { type: types.LINK_PROVIDER_SUCCESS }
      ];

      return store.dispatch(actions.linkProvider(mockProviderA.id, mockProfile.id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});