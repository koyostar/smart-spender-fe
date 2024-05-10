# SmartSpender - Splitting costs, not friendships.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Brief](#project-brief)
- [Roles](#roles)
- [Challenges](#challenges)
- [Key Learnings](#key-learnings)
- [Future Developments](#future-developments)
- [Acknowledgments](#acknowledgments)

## Introduction

SmartSpender App is designed to transform the way you manage your shared expenses among your friends. It consolidates your shared expenses, categorises them, provides calculative assistance and statistical information, of which user's will be able to view their expense and transaction history which will aid them in becoming a better debtor and payee. Let SmartSpender do the work for you!

<img src="https://raw.githubusercontent.com/aishu-ch/smart-spender-fe/main/public/readme/smartspender-landing.png">

## Features

- **User-friendly interface:** The app offers an intuitive and visually appealing user interface, ensuring seamless navigation and an enjoyable user experience.
- **Expense Tracking:** Effortlessly track and manage shared expenses. Users can log expenses, categorise them, and keep detailed records of all transactions.
- **Friend List Management:** Maintain a list of friends within the app. Easily add and remove friends, and proceed to manage shared expenses with specific individuals.
- **Expense History:** Access a comprehensive history of all your expenses and transactions. This feature allows users to review past expenditures, aiding them in becoming better debtors and payees.
- **Statistical Insights:** Obtain detailed statistical information on your spending habits. The app provides bar charts to help users make informed financial decisions.

<!-- <img src="https://raw.githubusercontent.com/aishu-ch/smart-spender-fe/main/public/readme/smartspender-home.png"> -->

## Deployment

SmartSpender App is deployed on [Render](https://render.com/) for the back-end and [Vercel](https://vercel.com/) for the front-end. You can access it [here](https://smart-spender.vercel.com/).

## Technologies Used

- React
- Express
- MongoDB
- Node.js
- Tailwind CSS

## Getting Started

### Wireframes

The utilisation of Adobe InDesign was used to design the prototype pages and components for our app which allows us to have a better idea of what we're dealing with.

- Wireframe 1:

<img src="https://raw.githubusercontent.com/aishu-ch/smart-spender-fe/main/public/readme/wireframe-1.png">

- Wireframe 2:

<img src="https://raw.githubusercontent.com/aishu-ch/smart-spender-fe/main/public/readme/wireframe-2.png">

- Wireframe 3:

<img src="https://raw.githubusercontent.com/aishu-ch/smart-spender-fe/main/public/readme/wireframe-3.png">

- Wireframe 4:

<img src="https://raw.githubusercontent.com/aishu-ch/smart-spender-fe/main/public/readme/wireframe-4.png">

- Wireframe 5:

<img src="https://raw.githubusercontent.com/aishu-ch/smart-spender-fe/main/public/readme/wireframe-5.png">

- Wireframe 6:

<img src="https://raw.githubusercontent.com/aishu-ch/smart-spender-fe/main/public/readme/wireframe-6.png">

### User Stories

- As a socially active individual who frequently shares expenses among my friends, I require an app that will help me to efficiently track and manage our shared expenses to ensure accurate and timely payments.

- As an individual striving to maintain financial transparency and accountability within my social circle, I seek an app that categorises and provides detailed statistical insights into our group spending habits.

- As an individual aiming to improve my financial management skills, I need an app that offers a clear history of my expenses and transactions, ultimately helping me become a more responsible debtor and payee.

- As an organized individual who likes to keep my financial records well-structured, I require an app that allows me to save and access specific transactions or expense records for future reference.

- As a member of multiple social groups with shared expenses, I need an app that enables me to maintain a digital list of friends and manage expenses efficiently within each group.

You can access our Trello board [here](https://trello.com/b/RERuKAdX/mern-stack-project).

### App Flow

- **Login Page**
- **Dashboard**
  - Statistical information
  - **Navbar Options:**
    1. Create expense
    2. View history
    3. Friend's list

#### Create expense

- Form to create and store group expense information in the database (e.g. date, category, amount, description, selected friend).
- Form to create and store group transfer information in the database (e.g. date, amount, expense, description).

#### View history

- Table to read expense history information from the database.
- Table to read expense transfer information from the database.

#### Friend's list

- Generate your friend's list based on inputs.

### Database Relationships

- **One-to-Many (1-M):**
  - One user (userId) can have multiple expenses (expenseId).
  - One user (userId) can have multiple transfers (transferId)
- **Many-to-Many (M-M):**
  - Many expenses (expenseId) can be associated with many users (userId).

## Project Brief

### Technical Requirements

- Use MongoDB, Express, React and Node (MERN Stack)

- Have at least 2 related models (with references) and an additional user model with authentication. There should be at least 2 types of users.

- Users password would need to be hashed for security.

- Include all major CRUD functions for each of the models

- Manage equitable team contributions and collaboration by using standard Git branching on Github.

- Nicely styled front-end with clean & well-formatted CSS, with or without a framework.

- Validations on the front-end and back-end have to be complete to the best of your ability

- Deploy your application online, so that it is publicly accessible

- User stories that apply to the functionality of your app, crafted as a team.

- Wireframes for the views you planned to create

## Roles

## Challenges

## Key Learnings

## Future Developments

## Acknowledgments

- We would like to thank the open-source community for their contributions to the libraries and tools used in this project.
