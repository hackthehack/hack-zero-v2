# Hack Zero
> Hackathon management web application <br>use in tandem with [Hack-Zero-Backend](https://github.com/hackthehack/hack-zero-v2-backend)

![Build Status](https://github.com/hackthehack/hack-zero-v2/workflows/Build%20and%20Deploy/badge.svg)

Hack Zero is a serverless hackathon management system. It allows entities to create a single location to share
and update participates on the details and happenings of a hackathon event.
Participates are also able to sign up to gain access to a range of features.

### Key Features
 * User Registration
 * User Login
 * Hack Idea Creation
 * Join Hack Idea Team
 * Editing Hacks
 * Hack Status
 * Liking Hack Ideas
 * Submit Hacks for Judging
 * Upload Files to Hack

### Planned Features
 * Commenting on Hack Ideas
 * Judge Voting
 * User Profile
 * User Roles
 * Filer Hack Idea List
 * ToDo list
 * Invite user to app/hack

## Usage

Hack Zero hack can be loaded into an S3 bucket for simple and quick deployment. An entity (A Company, Not for Profit or individual) can deploy the application ahead of a hackathon event and request users to sign up. Once the user has signed up they can create ideas for the upcoming hackathon and create teams. The entity can then use contentful to push updates about the event to the users home page.

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

## Contentful Setup
1. head to the [Contentful Webside](https://www.contentful.com)
2. Create an account and login
3. From the dashboard you should be able to create models and add data to those models.
4. to grab the contentful key and space id you will need to click on Settings -> API Keys
5. Add a new API Key, you can name it whatever you like
6. Scroll down on the page and you should see two values "Space ID" and "Content Delivery API - access token" you need to copy these values into your .env file you might have been missing these values from the step above

## S3 Bucket Configuration
1. Navigate to the Amazon S3 dashboard
2. Create a new bucket and name it accordingly, this can be whatever you want, select your preferred region 
3. Skip configuring the properties step, we wont need to change anything here
4. In the permissions step you will need to set the public access to "Grant public read access to this bucket"
5. Then hit create bucket
6. Select the bucket and navigate to its properties tab
7. Select website hosting
8. Click the "Use this bucket to host a website" and in both the Index and Error document field type "index.html" and click save
9. Next Move to the Permissions tab and select "Bucket Policy"
10. enter the following details into the policy editor
```JSON
{
    "Version": "2008-10-17",
    "Id": "PolicyForPublicWebsiteContent",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[BUCKET NAME]/*"
        }
    ]
}
```
11. Click save

Your bucket configuration is now complete

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
