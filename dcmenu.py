#
# Carlos Andres Montoro
#
# Script to get menu products from UCalgary Dining Centre API
#

import datetime
import enum
import json
import requests
import sys

# Constants
BASE_URL = "https://ucalgary.campusdish.com/api/menu/GetMenus"
LOCATION = 8345
MODE = "Daily"


# Period enum, constant ids for breakfast, lunch, and dinner
class Period(enum.Enum):
	BREAKFAST = 2071
	LUNCH = 2073
	DINNER = 2074


# Function to get list of products at a given date and period
def getMenuProducts(date: datetime.date, period: Period) -> list:
	r = requests.get(BASE_URL, params={
		"locationId": LOCATION,
		"mode": MODE,
		"date": date.strftime("%m/%d/%Y"),
		"periodId": period.value,
	})

	if r.status_code != 200:
		print("ERROR: Request failed")
		sys.exit(1)

	try:
		data = r.json()
		stations = {i["StationId"]: i["Name"] for i in data["Menu"]["MenuStations"]}
		products = [
			{
				"id": i["ProductId"],
				"name": i["Product"]["DisplayName"] or i["Product"]["MarketingName"],
				"description": i["Product"]["Description"] or i["Product"]["ShortDescription"],
				"recipeType": i["Product"]["PrimaRecipeType"],
				"stationId": i["StationId"],
				"station": stations[i["StationId"]],
				"category": i["Product"]["Categories"][0]["DisplayName"],
				"categoryRank": int(i["Product"]["Categories"][0]["MenuRanking"]),
			} for i in data["Menu"]["MenuProducts"]
		]
	except ValueError:
		print("ERROR: Invalid response")
		sys.exit(1)

	return products

def getDayMenu(date: datetime.date):
	PERIODS = ["breakfast", "lunch", "dinner"]

	menu = {}

	meals = []

	for item in PERIODS:

		period = Period[item.upper()]

		products = getMenuProducts(date, period)

		meal = {period.name.lower(): products}

		meals.append(meal)

	menu[date.strftime("%Y-%m-%d")] = meals

	return menu

def weekMenu(date: datetime.date):
	weekMenu = []
	for i in range(7):
		day = date + datetime.timedelta(days=i)
		weekMenu.append(getDayMenu(day))
		print(day)
	return weekMenu

# Main
if __name__ == "__main__":
	# argv[1] = date (YYYY-MM-DD)
	try:
		date = datetime.datetime.strptime(sys.argv[1], "%Y-%m-%d").date() if len(sys.argv) > 1 else datetime.date.today()
	except ValueError:
		print("ERROR: Invalid date")
		sys.exit(1)

	# argv[2] = period (breakfast, lunch, dinner)
	try:
		period = Period[sys.argv[2].upper()] if len(sys.argv) > 2 else Period.BREAKFAST
	except KeyError:
		print("ERROR: Invalid period")
		sys.exit(1)

	# argv[3] = output json fname
	outfname = sys.argv[3] if len(sys.argv) > 3 else None

	# Get products

	products = getMenuProducts(date, period)

	meal = {period.name.lower(): products}

	menu = { date.strftime("%Y-%m-%d") : meal }

	menu = weekMenu(date)

	# Print products
	print(json.dumps(menu, indent=4))

	# Write to file
	if outfname is not None:
		try:
			with open(outfname, "w") as file:
				json.dump(menu, file, indent=4)
		except TypeError:
			print("ERROR: Invalid output file")
			sys.exit(1)
			