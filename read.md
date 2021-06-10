# Node server
## _Node server receive token, encripts and return_


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Steps


## Installation

Install the dependencies and devDependencies and start the server.

```sh
npm i
node app
```

## endPoints

To send token and save it on node:

```sh
http://localhost:3000/create-token?token=[token]
```
This will return the token, some like this:

```sh
{
    "token": "$2b$10$5FiDJKiDWEiK3uydoKikb.g/GW31mO//G1ykCfbotdrMy9m6KsD.C"
}
```

Copy this token and make all the request that you want, but in the headers put authorization header the token
