# README


## Things you may want to setup the project:

- Install Node.js, mongoDb and npm

- Start mongoDb server by running `mongod --dbpath {your db data path}`

- After that you will run `npm i` to install the dependencies needed for this project

- Then you will run `npm start dev or node src/app.js` to run your server

## API Documentation:

- Here's a link of postman doucumentation [here](https://documenter.getpostman.com/view/910736/T1DiFfMP?version=latest)

## Notes

- The last API (GET /contacts/getSharedList) was unclear for me for different reasons and I didn't find any data flow compatibable to get shared contacts without taking any previous action but I made an assumption
  1) So I created an array of objects called sharedUsers in Contact model
  2) then you can pass the IDs of users you want to share the contact with in (POST /contatcs/addContact) as I mentioned in postman docs
  3) then finally you can call /contacts/getSharedList API with secondUserId to get the shared contacts between them 
