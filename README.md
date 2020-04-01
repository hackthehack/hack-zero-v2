# Hack Zero
> Hackathon management web application <br>use in tandem with [Hack-Zero-Backend](https://github.com/hackthehack/hack-zero-v2-backend)

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

Hack Zero is a serverless hackathon management system. It allows entities to create a single location to share
and update participates on the details and happenings of a hackathon event.
Participates are also able to sign up to gain access to a range of features.

### Key Features
 * User Registration
 * User Login
 * Hack Idea Creation
 * Join Hack Idea Team
 * Editing Hacks

![](header.png)

## Installation

First download Node.js from this location [Here](https://nodejs.org/en/)

OS X & Linux & Windows:

```sh
git clone https://github.com/hackthehack/hack-zero-v2
```
Once the app folder has finished downloading simply install the dependencies using the command bellow
```sh
npm install
```


## Usage

Hack Zero hack can be loaded into an S3 bucket for simple and quick deployment. An entity can deploy the application ahead of a hackathon event and request users to sign up. Once the user has signed up they can create ideas for the upcoming hackathon and create teams. The entity can then use contentful to push updates about the event to the users home page.

## Development setup

You will need to install Node.js in order to run this application, please refer to the installation above
<br>
The .env file will need to be updated with the correct API url:
```sh
REACT_APP_API_URL=[url]
```
the Contentful connection will also beed to be updated in the .env file:
```sh
REACT_APP_CONTENTFUL_KEY=[Your Key]
REACT_APP_CONTENTFUL_SPACE_ID=[Your ID]
```
Hack Zero utilizes reacts built in testing library along side Jest, to run the automated tests simply run the command below
```sh
npm test
```
Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
npm run
```


## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
