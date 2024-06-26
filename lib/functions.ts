export function createLink(dateFormatted: string, period: string) {
	const link = new URL("https://ucalgary.campusdish.com/api/menu/GetMenus");
	const LOCATION = "8345";
	const MODE = "Daily";
	link.searchParams.set("locationId", LOCATION);
	link.searchParams.set("mode", MODE);
	link.searchParams.set("date", dateFormatted);
	link.searchParams.set("periodId", period);
	link.searchParams.set("fulfillmentMethod", "");
	return link;
}

export async function fetchMenu(dateFormatted: string, period: string) {


	// console.log(`/api/menu?date=${dateFormatted}&period=${period}`)
	const menuResponse = await fetch(`/api/menu?date=${dateFormatted}&period=${period}`, {
		method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
	});

	const menu = await menuResponse.json(); // await the json() call to get the actual data
	const stations: { [key: string]: string } = {};
	for (const i of menu.Menu.MenuStations) {
		stations[i.StationId] = i.Name;
	}

	const products = menu.Menu.MenuProducts.map((i: any) => ({
		id: i.ProductId,
		name: i.Product.DisplayName || i.Product.MarketingName,
		description: i.Product.Description || i.Product.ShortDescription,
		recipeType: i.Product.PrimaRecipeType,
		stationId: i.StationId,
		station: stations[i.StationId],
		category: i.Product.Categories[0].DisplayName,
		categoryRank: parseInt(i.Product.Categories[0].MenuRanking),
	}));

	// console.log(products);


	const groupedProducts: { [station: string]: any[] } = products.reduce((result: any, product: any) => {
		if (!result[product.station]) {
			result[product.station] = [];
		}
		result[product.station].push(product);
		return result;
	}, {});

	const final: any = groupedProducts

	console.log(final);

	return final; // return the products array
}

export function formatDate(date: Date | undefined) {
	const year = date!.getFullYear();
	const month = String(date!.getMonth() + 1).padStart(2, '0');
	const day = String(date!.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}
