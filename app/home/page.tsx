"use client";

import { fetchMenu, formatDate } from '@/lib/functions'
import { useState , useEffect } from 'react'

import { Period } from '@/lib/constants';

import CalendarPopover from '@/components/CalendarPopover';

import MealPopover from '@/components/MealPopover';
import StationCard from '@/components/StationCard';

export default function Home() {
    // Calendar Date
    const [date, setDate] = useState<Date | undefined>(new Date())
	const [dateFormat, setDateFormat] = useState(() => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
		return formattedDate;
	});
    useEffect(() => {
        if (date) {
            setDateFormat(formatDate(date));
        }
    }, [date])

    const [meal, setMeal] = useState(currentMeal());
    const [mealString, setMealString] = useState(currentMealString());
    function handleMealChange(meal: string) {
		setMealString(meal.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()));
		{/*// @ts-ignore */}
		setMeal(Period[meal]);
	}

    function currentMeal() {
        const currentTime = new Date().getHours();
        if (currentTime <= 11) {
            return Period.BREAKFAST;
        } else if (currentTime <= 16) {
            return Period.LUNCH;
        } else {
            return Period.DINNER;
        }
    }
    function currentMealString() {
        const currentTime = new Date().getHours();
        if (currentTime <= 11) {
            return "Breakfast";
        } else if (currentTime <= 16) {
            return "Lunch";
        } else {
            return "Dinner";
        }
    }

    interface Menus {
        [key: string]: any;
    }

    const [menus, setMenus] = useState<Menus>({})

    useEffect(() => {
		async function getMenu() {
			const menu = await fetchMenu(formatDate(new Date()), currentMeal())
			setMenus(menu)
		}
		getMenu()
	}, [])

    useEffect(() => {
		async function getMenu() {
			const menu = await fetchMenu(dateFormat, meal)
			setMenus(menu)
		}
		getMenu()
	}, [dateFormat, meal])

    return (
        <div className='p-5'>
            <div className='m-5 [&>*]:text-center'>
				<h1 className="text-5xl font-bold">{date?.toDateString()}</h1>
				<h1 className="text-5xl font-bold">{mealString}</h1>
				
			</div>
            <div className='flex flex-col md:flex-row justify-center items-center [&>*]:mx-3 [&>*]:shadow-2xl '>
                <CalendarPopover date={date} setDate={setDate} />
                <MealPopover handle={handleMealChange}/>
            </div>

            <div className='flex flex-row flex-wrap justify-center items-start'>
                {
					Object.keys(menus).map(stationName => (
						<StationCard key={stationName} station={stationName} menu={menus[stationName]} />
					))
				}
            </div>
        </div>
    )
}