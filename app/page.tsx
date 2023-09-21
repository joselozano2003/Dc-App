import Link from "next/link"

export const metadata = {
	title: "Da Landing",
	description: "Da Landing",
}

import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<main>
			<div className="hero min-h-vh-minus-header background-main">
				<div className="hero-content text-center">
					<div className="color-title">
						<h1 className="text-5xl font-bold">Welcome to Da Landing</h1>
						<div>
							<p className="py-6">See the menu without burning ur eyes</p>
							<Link href="/home">
								<Button>Get Started</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}