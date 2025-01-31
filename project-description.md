# Mock Up

Here is wireframe of what the pages could look like in mobile environment

![mainpage](images\mockup\Mainpage.png) ![mainpageSearch](images\mockup\Mainpage_search.png)![mainpageSearch-step2](images\mockup\Mainpage_search-step2.png)

![Productlistpage](images\mockup\Productlistpage.png)
![Productdetailspage](images\mockup\Productdetailspage.png)
![Aboutuspage](images\AboutUsPage.jpg)

# Features

## Main Page

### For Unregistered Users:

- Prompt users with questions about their pet, including:
  - Animal Type: (e.g., dog, cat)
  - Weight: (to tailor product recommendations)
  - Age: (to suggest age-appropriate food)
  - Favorite products: pet's current food preferences
- Based on user responses, display a curated selection of pet food products that meet the specified criteria.
- No history/preferences saved (maybe apart from cookies history)

### For Registered Users:

- Bypass the initial questions during subsequent visits.
- Automatically display a personalized product selection based on previously provided pet information (type, weight, age).
- Allow users to update their pet information in their profile settings to refresh product recommendations.

Main page should include possibility to turn on/off maintenace alert in case the app is down.
Core function of this Main Page is to guide user to the product search page.

## Product Pages:

### Product Search Page

- Allow users to filter products based on various criteria:
  - Animal Type: Filter by dog or cat food.
  - Brand: Select preferred brands.
  - Price Range: Set minimum and maximum price limits. Price per unit calculation included.
  - Type of Food: Choose between dry, wet, or raw options.
  - Nutritional Needs: Filter based on specific dietary requirements (e.g., grain-free, high protein).
  - Product Size
  - Country of origin
- Display filtered results dynamically as users adjust their selections.
- Display eco-friendly and sustainability ratings to inform users about the environmental impact of their choices.
- Every displayed product is clickable which leads to specific product page. This is where only clicked product is shown, but it lists all the retailers of the product

### Detailed Product Pages

- Provide comprehensive information about each product:
- Display all relevant properties
- Show pricing details and available quantities.
- Include user reviews and ratings with an option to leave feedback. (star ratings with possibility to attach photos). Reviews should include helpful vote system (possibility to vote like/dislike for review)
- Present a list of resellers with direct purchase links and pricing for each option.
- Highlight eco-friendly and sustainability ratings.

- Pet food properties include:
  - Brand information: The manufacturer of the pet food.
  - Type: Classification of the food (e.g., dry, wet, raw).
  - Target Animal: Specify which animals the food is suitable for (e.g., dogs, cats).
  - Ingredients: List of components used in the product ().
  - Nutritional Information: Detailed breakdown of nutrients, including protein, fat, fiber,Omega fatty acids and vitamins.
  - Price: Current and historical retail price of the product.
  - Available Quantities and sizes: Stock levels indicating how much is available for purchase.
  - Reviews: User-generated feedback and ratings on the product.
  - Product inventory available in different retailers stores

### Analytics & Reporting Page (or simply - monitor page)

### Contains:

Depending on the role, page is different for every player:
User:

- Product popularity metrics
- Search trend analysis
- Price trend analysis
- Brand performance metrics

Admin - can see all that user sees and handle the registration of the retailers.

Retailer - can can see all that user sees, but only for their own products and data about them

Manager
can see:
all that user sees +
products,
registered users,
user behavior tracking metrics,
review analytics
retailers,
How many times links have been clicked (affliate revenue?),
best products (most clicked)

### Educational Content Page (blogs and newsletter)

Contains blogs and articles from different personas on:

- Ingredient glossary
- Nutritional guidelines
- Pet food selection guides
- Diet transition guides
- Brand comparisons
- Quality indicators explained
- Common allergen information
- Pet Owners reflections and experiences with pet food

### About Us Page

Contains:

- some background story about the project
- contact details
- social media links
- etc.

## User

### Can:

- Register and unregister (removes all user data)
- Update own data (name, email, address, icon, pet information)
- See list of available pet food products
- Filter products by animal type, brand, price range, etc.
- View detailed product information
- See list of resellers for a specific product with prices
- Purchase pet food (details: product, quantity, cost)
- Leave reviews for purchased products
- View order history and statistics (total spent, favorite brands, etc.)
- Set price alerts & discount alerts for specific products (including target price, alert method, and frequency)
- Set petfood reminders to notify the suitable time to order more food
- Set Availability alerts in case product is out-of-stock in all retailer stores
- Compare multiple retailer offering of products
- Activate / deactivate selected newsletters to come to their email address

- Earn and manage loyalty points
- Donate pet food to local shelters through the app
- Calculate "Carbon Pawprint" for purchases
- View and reserve discounted rescue pet food
- View personal spending dashboard and nutritional trends
- Create and maintain own "wish list" with products they want to buy

## Reseller

### Can

- Integrate API to synchronize:
  - Current product catalog
  - Real-time pricing
  - Product availability
- Automatically update product information
- Manage their product listings
- List near-expiry or surplus pet food for rescue program
- View sales analytics and market trends for their products
- Activate own brand promotion (ads) inside the app

## Manager

### Can

- Perform all functionalities of a Seller
- Approve/reject new seller applications
- View overall marketplace statistics
- Manage product categories and filters
- Lock user/reseller accounts if necessary
- Oversee rescue pet food program
- Generate comprehensive reports, incl. price history graphs
- Analyze market trends for the pet food industry
- Monitor environmental impact metrics
- Track impact of rescued food (waste reduction, donations)

## Admin

### Can

- Perform all functionalities of a Manager
- Add/remove Managers
- Access and modify all system data
- Reset the entire system (with caution)
- View system-wide analytics and performance metrics

# Core Requirements (Grade 3)

- User can register/unregister to system.
- User can update own data.
- User can see list of available pet food products.
- User can filter and search for products. Also user should see own search history.
- User can view detailed product information and reseller options.
- User can reserve rescue pet food.
- Seller can update own data.
- Seller can manage product listings.
- Seller can view list of their products.
- Seller can add rescue pet food listings.
- Seller can update rescue pet food availability.
- Manager can approve new sellers.
- Manager can see rescue pet food statistics.
- Admin can add/remove Managers.

# Extra Requirements (Grade 4-5)

- User can write reviews for purchased products.
- User can view browsing history (which products they browsed).
- User can set and receive price alert notifications.
- User can participate in loyalty program.
- User can calculate Carbon Pawprint for purchases.
- Seller can view affiliate link statistics.
- Manager and Seller can see advanced rescue pet food program analytics.
- Manager can lock user/seller accounts.
- Admin functionalities are fully implemented.
- Use JWT for access token implementation.
- Implement pet food donation platform.
- Generate environmental impact reports
