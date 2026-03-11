"""
Sample data generation script for testing Excel Report Comparator
Generates sample Excel files for comparison testing
"""

import pandas as pd


def generate_sales_report_v1():
    """Generate sample sales report version 1"""
    data = {
        "ID": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "Date": [
            "2024-01-01",
            "2024-01-02",
            "2024-01-03",
            "2024-01-04",
            "2024-01-05",
            "2024-01-06",
            "2024-01-07",
            "2024-01-08",
            "2024-01-09",
            "2024-01-10",
        ],
        "Product": [
            "Laptop",
            "Mouse",
            "Keyboard",
            "Monitor",
            "Headphones",
            "Webcam",
            "Microphone",
            "Speaker",
            "USB Cable",
            "HDMI Cable",
        ],
        "Quantity": [5, 15, 12, 3, 8, 10, 6, 4, 20, 18],
        "Price": [1200, 25, 75, 350, 120, 80, 90, 150, 5, 8],
        "Amount": [6000, 375, 900, 1050, 960, 800, 540, 600, 100, 144],
        "Salesperson": [
            "John",
            "Jane",
            "Bob",
            "Alice",
            "Charlie",
            "David",
            "Eve",
            "Frank",
            "Grace",
            "Henry",
        ],
        "Region": [
            "North",
            "South",
            "East",
            "West",
            "North",
            "South",
            "East",
            "West",
            "North",
            "South",
        ],
    }

    df = pd.DataFrame(data)
    df.to_excel("sample_sales_jan.xlsx", index=False)
    print("✓ Created sample_sales_jan.xlsx")


def generate_sales_report_v2():
    """Generate sample sales report version 2 (with changes)"""
    data = {
        "ID": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],  # Added ID 11
        "Date": [
            "2024-01-01",
            "2024-01-02",
            "2024-01-03",
            "2024-01-04",
            "2024-01-05",
            "2024-01-06",
            "2024-01-07",
            "2024-01-08",
            "2024-01-09",
            "2024-01-10",
            "2024-01-11",
        ],
        "Product": [
            "Laptop",
            "Mouse",
            "Keyboard",
            "Monitor",
            "Headphones",
            "Webcam",
            "Microphone",
            "Speaker",
            "USB Cable",
            "HDMI Cable",
            "Laptop Stand",
        ],  # Added new product
        "Quantity": [6, 15, 12, 3, 8, 10, 6, 4, 20, 18, 5],  # Changed Laptop quantity
        "Price": [1200, 25, 75, 350, 120, 80, 90, 150, 5, 8, 45],  # Added new price
        "Amount": [
            7200,
            375,
            900,
            1050,
            960,
            800,
            540,
            600,
            100,
            144,
            225,
        ],  # Updated amounts
        "Salesperson": [
            "John",
            "Jane",
            "Bob",
            "Alice",
            "Charlie",
            "David",
            "Eve",
            "Frank",
            "Grace",
            "Henry",
            "Iris",
        ],  # Added new salesperson
        "Region": [
            "North",
            "South",
            "East",
            "West",
            "North",
            "South",
            "East",
            "West",
            "North",
            "South",
            "East",
        ],  # Added new region
    }

    df = pd.DataFrame(data)
    df.to_excel("sample_sales_feb.xlsx", index=False)
    print("✓ Created sample_sales_feb.xlsx")


def generate_inventory_report_v1():
    """Generate sample inventory report version 1"""
    data = {
        "SKU": [
            "SKU001",
            "SKU002",
            "SKU003",
            "SKU004",
            "SKU005",
            "SKU006",
            "SKU007",
            "SKU008",
            "SKU009",
            "SKU010",
        ],
        "Product Name": [
            "Laptop",
            "Mouse",
            "Keyboard",
            "Monitor",
            "Headphones",
            "Webcam",
            "Microphone",
            "Speaker",
            "USB Cable",
            "HDMI Cable",
        ],
        "Category": [
            "Electronics",
            "Accessories",
            "Accessories",
            "Electronics",
            "Accessories",
            "Accessories",
            "Accessories",
            "Electronics",
            "Cables",
            "Cables",
        ],
        "Stock": [45, 120, 95, 30, 65, 80, 55, 25, 200, 180],
        "Reorder Level": [10, 20, 15, 5, 10, 15, 10, 5, 50, 50],
        "Unit Cost": [1000, 20, 60, 300, 100, 70, 80, 130, 4, 7],
        "Supplier": [
            "TechCorp",
            "PartsCo",
            "PartsCo",
            "TechCorp",
            "PartsCo",
            "PartsCo",
            "PartsCo",
            "TechCorp",
            "CableCo",
            "CableCo",
        ],
        "Last Updated": [
            "2024-01-15",
            "2024-01-15",
            "2024-01-15",
            "2024-01-15",
            "2024-01-15",
            "2024-01-15",
            "2024-01-15",
            "2024-01-15",
            "2024-01-15",
            "2024-01-15",
        ],
    }

    df = pd.DataFrame(data)
    df.to_excel("sample_inventory_jan.xlsx", index=False)
    print("✓ Created sample_inventory_jan.xlsx")


def generate_inventory_report_v2():
    """Generate sample inventory report version 2 (with changes)"""
    data = {
        "SKU": [
            "SKU001",
            "SKU002",
            "SKU003",
            "SKU004",
            "SKU005",
            "SKU006",
            "SKU007",
            "SKU008",
            "SKU009",
            "SKU010",
        ],
        "Product Name": [
            "Laptop",
            "Mouse",
            "Keyboard",
            "Monitor",
            "Headphones",
            "Webcam",
            "Microphone",
            "Speaker",
            "USB Cable",
            "HDMI Cable",
        ],
        "Category": [
            "Electronics",
            "Accessories",
            "Accessories",
            "Electronics",
            "Accessories",
            "Accessories",
            "Accessories",
            "Electronics",
            "Cables",
            "Cables",
        ],
        "Stock": [
            38,
            120,
            95,
            25,
            65,
            80,
            55,
            20,
            200,
            180,
        ],  # Changed some stock levels
        "Reorder Level": [10, 20, 15, 5, 10, 15, 10, 5, 50, 50],
        "Unit Cost": [
            1000,
            20,
            65,
            300,
            100,
            70,
            80,
            130,
            4,
            7,
        ],  # Changed keyboard cost
        "Supplier": [
            "TechCorp",
            "PartsCo",
            "PartsCo",
            "TechCorp",
            "PartsCo",
            "PartsCo",
            "PartsCo",
            "TechCorp",
            "CableCo",
            "CableCo",
        ],
        "Last Updated": [
            "2024-01-20",
            "2024-01-20",
            "2024-01-20",
            "2024-01-20",
            "2024-01-20",
            "2024-01-20",
            "2024-01-20",
            "2024-01-20",
            "2024-01-20",
            "2024-01-20",
        ],  # Updated date
    }

    df = pd.DataFrame(data)
    df.to_excel("sample_inventory_feb.xlsx", index=False)
    print("✓ Created sample_inventory_feb.xlsx")


def main():
    """Generate all sample data files"""
    print("Generating sample Excel files for testing...\n")

    generate_sales_report_v1()
    generate_sales_report_v2()
    generate_inventory_report_v1()
    generate_inventory_report_v2()

    print("\n✓ All sample files generated successfully!")
    print("\nGenerated files:")
    print("  - sample_sales_jan.xlsx")
    print("  - sample_sales_feb.xlsx")
    print("  - sample_inventory_jan.xlsx")
    print("  - sample_inventory_feb.xlsx")
    print("\nYou can now upload these files to test the Excel Report Comparator.")


if __name__ == "__main__":
    main()
