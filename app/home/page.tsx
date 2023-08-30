"use client"

import { fetchMenu, formatDate } from '@/lib/functions'
import { useState , useEffect } from 'react'

import Calendar from "react-calendar";
import "@/styles/Calendar.css";

import { Period } from '@/lib/constants';

export default function Home() {
	
	// Menu items to display
	const [menus, setMenus] = useState({})

	// Generate menu on page load from current date at breakfast
	useEffect(() => {
		async function getMenu() {
			const menu = await fetchMenu(formatDate(new Date()), "2071")
			console.log("Initial menu: ", menu)
			setMenus(menu)
		}
		getMenu()
	}, [])

	// Calendar popup
	const [showCalendar, setShowCalendar] = useState(false);

	// Date state for calendar
	const [selectedDate, setSelectedDate] = useState(new Date());

	const [selectedMeal, setSelectedMeal] = useState(Period.BREAKFAST);

	const [mealString, setMealString] = useState("Breakfast");

	// Date state for API calls
	const [dateFormat, setDateFormat] = useState(() => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
		return formattedDate;
	});

	// Updates date 
	const handleDateChange = (date: any) => {
		setSelectedDate(date);
		const formattedDate = formatDate(date);
		
		console.log(formattedDate);
		setDateFormat(formattedDate);
		setShowCalendar(false);
	};

	// Update menu upon data change
	useEffect(() => {
		async function getMenu() {
			const menu = await fetchMenu(dateFormat, selectedMeal)
			setMenus(menu)
		}
		getMenu()
	}, [dateFormat])
	
	const [showMealSelector, setShowMealSelector] = useState(false);

	useEffect(() => {
		async function getMenu() {
			const menu = await fetchMenu(dateFormat, selectedMeal)
			setMenus(menu)
		}
		getMenu()
	}, [selectedMeal])


	function handleMealChange(meal: string) {
		setShowMealSelector(false);
		setMealString(meal.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()));
		{/*// @ts-ignore */}
		setSelectedMeal(Period[meal]);
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between py-20">
			<div className='m-5 [&>*]:text-center'>
				<h1 className="text-5xl font-bold">{selectedDate.toDateString()}</h1>
				<h1 className="text-5xl font-bold">{mealString}</h1>
				
			</div>
			<div className='flex flex-row justify-center [&>*]:mx-3'>
				<button className='btn btn-primary' onClick={() => setShowCalendar(true)}>Change Date</button>
				<button className='btn btn-secondary' onClick={() => setShowMealSelector(true)}>Change Meal</button>
				{/* <h1>Date: {selectedDate.toString()}</h1> */}
			</div>
			<div className='flex flex-row flex-wrap justify-center items-start'>
				{
					Object.keys(menus).map(stationName => (
						<div key={stationName} className='card w-80 bg-primary text-primary-content m-5 p-5'>
							<h2 className='text-center font-bold text-2xl'>{stationName}</h2>
							<hr className="border-2 border-secondary rounded my-3"/>
							<ul>
								{/*// @ts-ignore */}
								{menus[stationName].map((recipe: any) => (
								<li key={recipe.id}>
									<h3>{recipe.name}</h3>
								</li>
								))}
							</ul>
						</div>
					))
				}
			</div>
			<div className='fixed'>

				{showCalendar && (
					<div className="popup">
						<div className="popup-inner">
							<div className="topCalendar">
								<button className="close-button" onClick={() => setShowCalendar(false)}>X</button>
								<h2>Select A Date</h2>
								<p className="close-button" id="placeholder">X</p>
							</div>
							<Calendar
							value={selectedDate}
							onChange={handleDateChange}
							className="react-calendar"
							/>
						</div>
					</div>
				)}
			</div>
			<div className='fixed'>
				{showMealSelector && (
					<div className="popup">
						<div className="popup-inner">
							<div className="topCalendar">
								<button className="close-button" onClick={() => setShowMealSelector(false)}>X</button>
								<h2>Select A Meal</h2>
								</div>
							<div className="meal-selector-menu">
								<button className="meal-selector-button" onClick={() => handleMealChange("BREAKFAST")}>Breakfast</button>
								<button className="meal-selector-button" onClick={() => handleMealChange("LUNCH")}>Lunch</button>
								<button className="meal-selector-button" onClick={() => handleMealChange("DINNER")}>Dinner</button>
							</div>
						
						</div>
					</div>
				)}
			</div>
		</main>
	)
}
