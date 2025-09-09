# -*- coding: utf-8 -*-
from flask import Flask, request, render_template
import pickle
import matplotlib.pyplot as plt
import os
import numpy as np

# Create application
app = Flask(__name__)

# Load ML model
with open('newnew.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/', methods=['GET'])
def Home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        form_data = request.form.to_dict()

        # Convert numerical values
        Item_Weight = float(form_data['Item_Weight'])
        Item_Visibility = float(form_data['Item_Visibility'])
        Item_MRP = float(form_data['Item_MRP'])
        Outlet_Establishment_Year = int(form_data['Outlet_Establishment_Year'])

        # Encode categorical values
        Item_Fat_Content = 1 if form_data['Item_Fat_Content'] == "Regular" else 0

        item_types = ['Breads', 'Breakfast', 'Canned', 'Dairy', 'Frozen Foods',
                      'Fruits and Vegetables', 'Hard Drinks', 'Health and Hygiene',
                      'Household', 'Meat', 'Others', 'Seafood', 'Snack Foods',
                      'Soft Drinks', 'Starchy Foods']
        item_type_flags = [1 if form_data['Item_Type'] == t else 0 for t in item_types]

        outlet_ids = ['OUT013', 'OUT017', 'OUT018', 'OUT019', 'OUT027',
                      'OUT035', 'OUT045', 'OUT046', 'OUT049']
        outlet_id_flags = [1 if form_data['Outlet_Identifier'] == o else 0 for o in outlet_ids]

        Outlet_Size_Medium = 1 if form_data['Outlet_Size'] == "Medium" else 0
        Outlet_Size_Small = 1 if form_data['Outlet_Size'] == "Small" else 0

        Tier2 = 1 if form_data['Outlet_Location_Type'] == "Tier 2" else 0
        Tier3 = 1 if form_data['Outlet_Location_Type'] == "Tier 3" else 0

        outlet_types = ['Supermarket Type1', 'Supermarket Type2', 'Supermarket Type3']
        outlet_type_flags = [1 if form_data['Outlet_Type'] == t else 0 for t in outlet_types]

        features = [
            Item_Weight, Item_Visibility, Item_MRP, Outlet_Establishment_Year,
            Item_Fat_Content, *item_type_flags, *outlet_id_flags,
            Outlet_Size_Medium, Outlet_Size_Small,
            Tier2, Tier3, *outlet_type_flags
        ]

        # Predict sales
        prediction = model.predict([features])
        predicted_sales = round(prediction[0], 2)

        # Generate Bar Chart
        plt.figure(figsize=(10, 5))
        plt.bar(["Item Weight", "Item Visibility", "Item MRP"], 
                [Item_Weight, Item_Visibility, Item_MRP], color='skyblue')
        plt.xlabel("Input Features")
        plt.ylabel("Sales Impact")
        plt.title(f"Feature Impact on Predicted Sales: {predicted_sales}")
        plt.grid(axis='y', linestyle='--', alpha=0.7)
        bar_chart_path = os.path.join('static', 'bar_chart.png')
        plt.savefig(bar_chart_path)
        plt.close()

        # Generate Pie Chart
        labels = [form_data['Item_Type'], form_data['Outlet_Identifier'], form_data['Outlet_Type']]
        sizes = [1, 1, 1]  # Each selected category gets equal weight
        colors = ['#ff9999', '#66b3ff', '#99ff99']
        plt.figure(figsize=(7,7))
        plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=90)
        plt.title("Categorical Feature Distribution")
        pie_chart_path = os.path.join('static', 'pie_chart.png')
        plt.savefig(pie_chart_path)
        plt.close()

        # Generate Histogram (Fixed Issue)
        plt.figure(figsize=(8, 5))
        plt.hist(Item_Weight, bins=10, color='r', alpha=0.7, label='Weight')
        plt.hist(Item_Visibility, bins=10, color='g', alpha=0.7, label='Visibility')
        plt.hist(Item_MRP, bins=10, color='b', alpha=0.7, label='MRP')
        plt.xlabel("Value")
        plt.ylabel("Frequency")
        plt.title("Distribution of Numerical Features")
        plt.legend()
        hist_chart_path = os.path.join('static', 'hist_chart.png')
        plt.savefig(hist_chart_path)
        plt.close()

        return render_template("index.html", Price=predicted_sales, form_data=form_data, 
                               bar_chart=bar_chart_path, pie_chart=pie_chart_path, hist_chart=hist_chart_path)

    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run(debug=True)