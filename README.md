[![Netlify Status](https://api.netlify.com/api/v1/badges/88231235-ed2d-443f-8a4f-9631cf6e32de/deploy-status)](https://app.netlify.com/sites/awesome-newton-d4015e/deploys)

## Project Name & Pitch

Pangaea Lumin Prototype

An ecommerce app used to view and add products to cart built with React, Context-API and GraphQL.

## Project Features

- Users can view all products.
- Users can view total number of items in the cart
- Users can add a product to the cart.
- Trying to add an existing product in the cart will increase the product quantity in the cart
- Users can can remove a product from the cart via the cancel button or when the product quantity is 0.
- Users can increment or decrement product quantity in the cart
- Users can view subtotal of all items in the cart
- Users can update the price of items in the cart
- Users cart is persisted to avoid clearing cart items on page refresh or reload

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm/yarn` installed globally on your machine.

Installation:

`npm install`

Create a .env file and add the following variables:

`REACT_APP_APOLLO_CLIENT_URL='https://pangaea-interviews.now.sh/api/graphql'`

To Start Server:

`npm start`

To Visit App:

`localhost:3000`

## Reflection

I started this process by using the `create-react-app`, then added `apollo graphql client setup` and `context-API setup`.

## Deployment

This application is deployed with `Netlify` and it is live [here](https://awesome-newton-d4015e.netlify.app/)

