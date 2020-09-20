import TwelveData from '../';

test(`initialization without a config throws an error`, () => {
  expect(() => TwelveData()).toThrow(`Missing config settings: key`);
});

test(`initialization with a config is succesfull`, () => {
  const twelveData = TwelveData({key: 'a-key'});

  expect(twelveData).toBeDefined();
  expect(twelveData.earnings).toBeDefined();
  expect(twelveData.timeSeries).toBeDefined();
});
