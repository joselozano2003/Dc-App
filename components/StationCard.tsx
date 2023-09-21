import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"



interface Props {
    station: any
    menu: [key: string]
}

export default function StationCard({ station, menu }: Props) {
    return (
       <Card className="w-80 m-5 p-5 border-4 shadow-2xl">
            <CardHeader>
                <CardTitle className="text-primary text-center font-bold">{station}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    {/*// @ts-ignore */}
                    {menu.map((recipe: any) => (
                    <li key={recipe.id}>
                        <h3>{recipe.name}</h3>
                    </li>
                    ))}
                </ul>
            </CardContent>
       </Card>
    )
}

