const fetchData = (resource) => {
  const BASE_API = 'https://coinranking1.p.rapidapi.com/';
  const finalUrl = `${BASE_API}${resource}`;

  return fetch(finalUrl, {
    headers: new Headers({
      'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
      'x-rapidapi-key': process.env.VUE_APP_RAPIDAPI_KEY,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data);
};

const getRanking = () => {
  return fetchData('coins?limit=20&timePeriod=24h');
};

const getCoin = (id) => {
  return fetchData(`coin/${id}?timePeriod=24h`);
};

const getCoinHistory = (id) => {
  return fetchData(`coin/${id}/history?timePeriod=24h`);
};

const getExchanges = (id) => {
  return fetchData(`coin/${id}/exchanges?limit=10`);
};

const getMarkets = (coin) => {
  return fetchData(`assets/${coin}/markets?limit=5`);
};

export default {
  getMarkets,
  getRanking,
  getCoin,
  getCoinHistory,
  getExchanges,
};
