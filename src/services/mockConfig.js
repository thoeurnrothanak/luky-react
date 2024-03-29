import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// This sets the mock adapter on the default instance
export default new MockAdapter(axios, {
  delayResponse: 500,
  onNoMatch: 'passthrough',
});
