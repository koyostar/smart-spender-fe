# SmartSpender - Splitting costs, not friendships.

## Table of Contents

- [Project Brief](#project-brief)

## Project Brief

### App Flow

- **Login Page**
- **Navbar Options**
  1. Home
  2. Create expense
  3. View history
  4. Friend's list

#### Home

- Provides statistical information on the user's expenses, loans and debts.

#### Create expense

- Form to create and store group expense information in the database (e.g. date, category, amount, description, selected friend).
- Form to create and store group transfer information in the database (e.g. date, amount, expense, description).

#### View history

- Table to read expense history information from the database.
- Table to read expense transfer information from the database.

#### Friend's list

- Create your friend's list based on inputs.

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

You can access our Trello board [here](https://trello.com/b/RERuKAdX/mern-stack-project).

### User Stories

- As a socially active individual who frequently shares expenses among my friends, I require an app that will help me to efficiently track and manage our shared expenses to ensure accurate and timely payments.

- As an individual striving to maintain financial transparency and accountability within my social circle, I seek an app that categorises and provides detailed statistical insights into our group spending habits.

- As an individual aiming to improve my financial management skills, I need an app that offers a clear history of my expenses and transactions, ultimately helping me become a more responsible debtor and payee.

- As an organized individual who likes to keep my financial records well-structured, I require an app that allows me to save and access specific transactions or expense records for future reference.

- As a member of multiple social groups with shared expenses, I need an app that enables me to maintain a digital list of friends and manage expenses efficiently within each group.

### Database Relationships

- **One-to-Many (1-M):**

  - One user (userId) can have multiple expenses (expenseId).
  - One user (userId) can have multiple transfers (transferId).
  - One user (userId) can have multiple friends (friendId).

- **Many-to-Many (M-M):**

  - Many expenses (expenseId) can be associated with many users (userId).

- **Many-to-One (M-O):**

  - Many users (expenseId) can be associated with one expense (expenseId).
