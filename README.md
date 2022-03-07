# Coin Center 🪙

It is a project created with Vue and Tailwind CSS that connects to the Coin Ranking api and displays a ranking of the most popular cryptocurrencies in the market. You can also enter the details of each one, use a calculator to convert to USD, see a line graph with the price variation in the last 24 hours and also a list with the main exchanges found.

## First thing's first
```
npm install
```

## Waiting! We need an api key

1. To obtain an api key it is necessary to enter this link and create an account: https://rapidapi.com/
2. Then it's time to access https://rapidapi.com/Coinranking/api/coinranking1 and subscribe to the api to get a key.
3. Create an .env file at the root of the project.
4. Inside the env. file, create a variable VUE_APP_RAPIDAPI_KEY and assign the value of the new key to it.
5. You should have a result like the following image 👇🏽

![image](https://user-images.githubusercontent.com/78749365/156949236-a4352cdb-c16b-4152-affa-6b97e8c381cf.png)


## Do you want to run it locally and make modifications?
```
npm run serve
```

## Everything ready to send to production?
```
npm run build
```

## Errors in the code?
```
npm run lint
```
