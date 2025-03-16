import random
import uuid
import json
import os
from faker import Faker
from datetime import datetime, timedelta
from pymongo import MongoClient
# Custom JSON encoder to handle datetime objects
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

## Original code made by: Nahid Islam
## Modified by: Lari Leppänen

# Main class to simulate advanced resellers data
class AdvancedResellersDataSimulator:
    def __init__(self, num_products=100, image_folder='assets'):
        self.fake = Faker()  # Initialize Faker for generating fake data
        self.num_products = num_products  # Number of products to generate

        # Resolve the relative path to the image folder
        script_dir = os.path.dirname(__file__)
        self.image_folder = os.path.join(script_dir, image_folder)

        # List of resellers with their types and regions
        self.retailers = [
            {"name": "Musti&mirri", "type": "Brick & Mortar", "regions": ["Skandinavia", "Local", "National"]},
            {"name": "Petenkoiratarvike", "type": "Online", "regions": ["National"]},
            {"name": "Zooplus", "type": "Online", "regions": ["National"]},
            {"name": "Puuilo", "type": "Brick & Mortar", "regions": ["Skandinavia", "Local", "National"]},
            {"name": "Bitiba", "type": "Multimarket", "regions": ["National"]},
            {"name": "Prisma", "type": "Independent", "regions": ["Local"]},
            {"name": "PetSmart", "type": "Brick & Mortar", "regions": ["International"]},
            {"name": "Petco", "type": "Brick & Mortar", "regions": ["International"]},
            {"name": "Chewy", "type": "Online", "regions": ["International"]},
            {"name": "Amazon", "type": "Online", "regions": ["Skandinavia"]},
            {"name": "Walmart", "type": "Multimarket", "regions": ["International"]},
            {"name": "Target", "type": "Multimarket", "regions": ["Skandinavia"]},
            {"name": "Costco", "type": "Brick & Mortar", "regions": ["Local"]},
            {"name": "Sam's Club", "type": "Brick & Mortar", "regions": ["Skandinavia"]},
            {"name": "BJ's Wholesale Club", "type": "Brick & Mortar", "regions": ["International"]},
            {"name": "Pet Supplies Plus", "type": "Brick & Mortar", "regions": ["Local"]},
            {"name": "Pet Valu", "type": "Brick & Mortar", "regions": ["National"]},
            {"name": "Pet Supermarket", "type": "Brick & Mortar", "regions": ["National"]},
            {"name": "Petland", "type": "Brick & Mortar", "regions": ["Local"]},
            {"name": "PetFlow", "type": "Online", "regions": ["National"]},
            {"name": "Pet World", "type": "Brick & Mortar", "regions": ["Local"]},
            {"name": "Pet Planet", "type": "Online", "regions": ["National"]},
            {"name": "Pet Universe", "type": "Multimarket", "regions": ["International"]},
            {"name": "Pet Galaxy", "type": "Brick & Mortar", "regions": ["National"]},
            {"name": "Pet Kingdom", "type": "Online", "regions": ["International"]},
            {"name": "Pet Empire", "type": "Multimarket", "regions": ["Skandinavia"]},
            {"name": "Pet Haven", "type": "Brick & Mortar", "regions": ["Local"]},
            {"name": "Pet Paradise", "type": "Online", "regions": ["National"]},
            {"name": "Pet Oasis", "type": "Multimarket", "regions": ["International"]},
            {"name": "Pet Haven", "type": "Brick & Mortar", "regions": ["Local"]}
        ]

        # List of pet food brands
        self.brands = [
            "Mars Petcare", "Purina", "Hill's Science Diet", 
            "Royal Canin", "Blue Buffalo", "Wellness", 
            "Orijen", "Acana", "Taste of the Wild", "PrimaPet",
            "Nutro", "Iams", "Eukanuba", "Pedigree", "Cesar",
            "Sheba", "Whiskas", "Friskies", "Fancy Feast", "Meow Mix",
            "Natural Balance", "Nature's Logic", "Solid Gold", "Canidae", "Merrick",
            "NutriSource", "Victor", "Zignature", "Fromm", "Earthborn Holistic"
        ]
            

        # List of manufacturers
        self.manufacturers = [
            "Nestle Purina PetCare", "Mars Petcare", "Hill's Pet Nutrition",
            "Blue Buffalo", "WellPet", "Diamond Pet Foods",
            "Spectrum Brands", "Central Garden & Pet", "Champion Petfoods",
            "Nutro Products", "Big Heart Pet Brands", "Nature's Variety",
            "Solid Gold Pet", "Canidae Pet Food", "Merrick Pet Care",
            "NutriSource Pet Foods", "Midwestern Pet Foods", "Fromm Family Foods",
            "Earthborn Holistic Pet Food", "Zignature Pet Food"
    ]

        self.manufacturer_to_brands = {
            "Nestle Purina PetCare": ["Purina", "Friskies", "Fancy Feast"],
            "Mars Petcare": ["Mars Petcare", "Royal Canin", "Pedigree", "Cesar", "Sheba", "Whiskas"],
            "Hill's Pet Nutrition": ["Hill's Science Diet"],
            "Blue Buffalo": ["Blue Buffalo"],
            "WellPet": ["Wellness", "Natural Balance"],
            "Diamond Pet Foods": ["Taste of the Wild", "NutriSource", "Victor"],
            "Spectrum Brands": ["Iams", "Eukanuba"],
            "Central Garden & Pet": ["PrimaPet", "Nature's Logic"],
            "Champion Petfoods": ["Orijen", "Acana"],
            "Nutro Products": ["Nutro"],
            "Big Heart Pet Brands": ["Meow Mix"],
            "Nature's Variety": ["Nature's Logic"],
            "Solid Gold Pet": ["Solid Gold"],
            "Canidae Pet Food": ["Canidae"],
            "Merrick Pet Care": ["Merrick"],
            "NutriSource Pet Foods": ["NutriSource"],
            "Midwestern Pet Foods": ["Victor"],
            "Fromm Family Foods": ["Fromm"],
            "Earthborn Holistic Pet Food": ["Earthborn Holistic"],
            "Zignature Pet Food": ["Zignature"]
    }


        # List of pet categories with their sizes
        self.pet_categories = [
            {"type": "Dog", "sizes": ["Small", "Medium", "Large"]},
            {"type": "Cat", "sizes": ["Small", "Medium"]}
        ]

        # List of pricing strategies
        self.pricing_strategies = [
            "Dynamic", "Fixed", "Promotional", "Seasonal"
        ]

        # List of common ingredients in pet food
        self.ingredients_list = [
            "Chicken", "Beef", "Salmon", "Lamb", "Turkey", "Duck", "Sweet Potato",
            "Peas", "Carrots", "Brown Rice", "Barley", "Oats", "Pumpkin", "Spinach",
            "Blueberries", "Cranberries", "Flaxseed", "Chia Seeds", "Sunflower Oil",
            "Fish Oil", "Vitamins", "Minerals"
        ]

        # List of additional ingredients in pet food
        self.additional_ingredients = [
            "Animal digest", "Calcium carbonate", "Salt", "Calcium phosphate", 
            "Potassium chloride", "L-lysine monohydrochloride", "Choline chloride", 
            "Zinc sulfate", "Vitamin E supplement", "Zinc proteinate", "Ferrous sulfate", 
            "Added color (Red 40, Yellow 5)", "DL-methionine", "Manganese sulfate", 
            "Manganese proteinate", "Niacin", "Vitamin A supplement", "Copper sulfate", 
            "Calcium pantothenate", "Copper proteinate", "Garlic oil", "Pyridoxine hydrochloride",
            "Vitamin B-12 supplement", "Thiamine mononitrate", "Vitamin D-3 supplement", "Riboflavin supplement",
            "Calcium iodate", "Menadione sodium bisulfite complex (source of vitamin K)", "Folic acid", "Biotin"
        ]

        # List of common allergens
        self.common_allergens = ["Grain", "Soy", "Dairy", "Chicken", "Beef", "Fish"]

    # Read image filenames from the specified folder
        self.image_filenames = [f for f in os.listdir(image_folder) if f.endswith(('.png', '.jpg', '.jpeg'))]

    # Method to generate product metadata
    def generate_product_metadata(self, product_id):
        pet_category = random.choice(self.pet_categories)
        #randomly select 0-2 common allergens for each product and leave some of them without allergens
        sensitivities = random.sample(self.common_allergens, random.randint(0, 2)) if random.random() > 0.15 else []
        return {
            "product_id": product_id,
            "brand": random.choice(self.brands),
            "pet_type": pet_category["type"],
            "pet_size": random.choice(pet_category["sizes"]),
            "dietary_type": random.choice([
                "Standard", "Weight Management", 
                "Senior", "Puppy/Kitten"
            ]),
            "sensitivities": sensitivities
        }

    # Method to generate a product
    def generate_product(self, product_id):
        protein = round(random.uniform(20, 40), 2)
        fat = round(random.uniform(10, 20), 2)
        other = round(100 - protein - fat, 2)
        
        nutrients = {
            "protein": f"{protein}%",
            "fat": f"{fat}%",
            "fiber": f"{round(random.uniform(1, 10), 2)}%",
            "moisture": f"{round(random.uniform(5, 12), 2)}%",
            "ash": f"{round(random.uniform(1, 8), 2)}%"
        }

        product_metadata = self.generate_product_metadata(product_id)
        sensitivities = product_metadata["sensitivities"]
        
           # Filter ingredients based on sensitivities
        ingredients = random.sample(self.ingredients_list, 5) + random.sample(self.additional_ingredients, 10)
        if "Grain" in sensitivities:
            ingredients = [ingredient for ingredient in ingredients if ingredient not in ["Brown Rice", "Barley", "Oats"]]
        if "Soy" in sensitivities:
            ingredients = [ingredient for ingredient in ingredients if ingredient != "Soy"]
        if "Dairy" in sensitivities:
            ingredients = [ingredient for ingredient in ingredients if ingredient != "Dairy"]
        if "Chicken" in sensitivities:
            ingredients = [ingredient for ingredient in ingredients if ingredient != "Chicken"]
        if "Beef" in sensitivities:
            ingredients = [ingredient for ingredient in ingredients if ingredient != "Beef"]
        if "Fish" in sensitivities:
            ingredients = [ingredient for ingredient in ingredients if ingredient not in ["Salmon", "Fish Oil"]]
        

        brand = product_metadata["brand"]
        manufacturer = next((m for m, b in self.manufacturer_to_brands.items() if brand in b), None)



        return {
            "id": product_id,
            "name": self.fake.word().capitalize() + " Pet Food",
            "manufacturer": manufacturer,
            "ingredients": ingredients,
            "nutrients": nutrients,
            "product_metadata": product_metadata,
            "size": random.choice(["1kg", "2kg", "10kg", "15kg"]),
            "age": random.choice(["Puppy", "Adult", "Senior"]),
            "image": random.choice(self.image_filenames), # Generate a random image
            "reviews": [
                {
                    "id": str(uuid.uuid4()),  # Add unique ID to each review
                    "rating": random.randint(1, 5),
                    "comment": self.fake.sentence()
                } for _ in range(random.randint(1, 5))
            ]
        }

    # Method to generate reseller inventory
    def generate_reseller_inventory(self, product_metadata):
        inventory_data = []
         # Randomly select 1-20 resellers for each product
        selected_retailers = random.sample(self.retailers, random.randint(1, 20))
        for retailer in selected_retailers:
            # Complex inventory simulation
            stock_levels = {
                "Brick & Mortar": (50, 500),
                "Online": (200, 2000),
                "Multimarket": (100, 1000),
                "Independent": (20, 200)
            }
            stock_range = stock_levels[retailer["type"]]
            stock_quantity = random.randint(stock_range[0], stock_range[1])
            # Dynamic pricing logic
            base_price = round(random.uniform(20, 80), 2)
            pricing_strategy = random.choice(self.pricing_strategies)
            # Price variations based on strategy
            price_multipliers = {
                "Dynamic": random.uniform(0.9, 1.1),
                "Fixed": 1.0,
                "Promotional": random.uniform(0.8, 0.9),
                "Seasonal": random.uniform(0.85, 1.15)
            }
            sale_price = round(base_price * price_multipliers[pricing_strategy], 2)
            inventory_entry = {
                "inventory_id": str(uuid.uuid4()),
                "product_id": product_metadata["product_id"],
                "retailer_name": retailer["name"],
                "regions": retailer["regions"],
                "stock_quantity": stock_quantity,
                "base_price": base_price,
                "sale_price": sale_price,
                "pricing_strategy": pricing_strategy,
                "inventory_status": "In Stock" if stock_quantity > 0 else "Out of Stock",
                "last_updated": datetime.now()
            }
            inventory_data.append(inventory_entry)
        return inventory_data

    # Method to generate sales history
    def generate_sales_history(self, inventory_data):
        sales_history = []
        for entry in inventory_data:
            # Simulate sales data for the last 6 months
            monthly_sales = [
                {
                    "product_id": entry["product_id"],
                    "retailer_name": entry["retailer_name"],
                    "month": (datetime.now() - timedelta(days=30*i)).strftime("%Y-%m"),
                    "total_units_sold": random.randint(10, entry["stock_quantity"]),
                    "total_revenue": round(random.uniform(100, 5000), 2)
                } for i in range(6)
            ]
            sales_history.extend(monthly_sales)
        return sales_history

    # Method to generate the entire dataset
    def generate_dataset(self):
        products = []
        inventory_data = []
        sales_history = []

        for _ in range(self.num_products):
            product_id = str(uuid.uuid4())
            product = self.generate_product(product_id)
            products.append(product)
            product_metadata = product["product_metadata"]
            inventory_entries = self.generate_reseller_inventory(product_metadata)
            inventory_data.extend(inventory_entries)
            sales_history.extend(self.generate_sales_history(inventory_entries))

        manufacturers = [{"id": i, "name": brand} for i, brand in enumerate(self.brands, start=1)]
        data = {
            "inventory_data": inventory_data,
            "sales_history": sales_history,
            "products": products,
            "manufacturers": manufacturers
        }
        return data

    # Method to save the dataset to a JSON file
    # def save_to_json(self, filename='Product.json'):
    #     data = self.generate_dataset()
    #     with open(filename, 'w') as f:
    #         json.dump(data, f, indent=2, cls=DateTimeEncoder)

    # Method to push data to MongoDB
    def push_to_mongo(self, db_name='ProductDATA', host='localhost', port=27018):
        # Connect to MongoDB
        client = MongoClient(host, port)
        db = client[db_name]

        # Generate the dataset
        data = self.generate_dataset()

        # Insert data into collections
        db.products.insert_many(data["products"])
        db.inventory.insert_many(data["inventory_data"])
        db.sales_history.insert_many(data["sales_history"])
        db.manufacturers.insert_many(data["manufacturers"])

        print("Data successfully pushed to MongoDB!")

# Example usage
if __name__ == "__main__":
    simulator = AdvancedResellersDataSimulator(num_products=1000)
    simulator.push_to_mongo()