const fetchData = (resource) => {
  const BASE_API = 'api.coincap.io/v2/';
  const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
  const finalUrl = `${CORS_ANYWHERE}${BASE_API}${resource}`;

  return fetch(finalUrl, {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

const getAssets = () => {
  return fetchData('assets?limit=20');
};

const getAsset = (coin) => {
  return fetchData(`assets/${coin}?limit=20`);
};

const getAssetHistory = (coin) => {
  const now = new Date();
  const end = now.getTime();

  now.setDate(now.getDate() - 1);

  const start = now.getTime();

  return fetchData(
    `assets/${coin}/history?interval=h1&start=${start}&end=${end}`
  );
};

const getMarkets = (coin) => {
  return fetchData(`assets/${coin}/markets?limit=5`);
};

const getExchange = (id) => {
  return fetchData(`exchanges/${id}`);
};

export default {
  getAssets,
  getAsset,
  getAssetHistory,
  getMarkets,
  getExchange,
};
