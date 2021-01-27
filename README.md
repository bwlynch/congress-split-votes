To grab data, use the syntax below. Initially leave out the `?offset=20` portion, and then use it and increment it by 20 each time, as the propublica api returns 20 results at a time.

`curl "https://api.propublica.org/congress/v1/house/votes/recent.json?offset=20" -H "X-API-Key: C7Wf8TJ7wlyHtRLb2IFgzFOdanKYOXByS9SqEUFT" > data2.json`
