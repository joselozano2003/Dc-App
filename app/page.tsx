import Link from "next/link"

export default function Home() {
	return (
		<main>
			<div className="hero min-h-vh-minus-header bg-base-200 background-main">
				<div className="hero-content text-center">
					<div className="text-neutral-content">
						<h1 className="text-5xl font-bold">Welcome to Da Landing</h1>
						<div>
							<p className="py-6">See the menu without burning ur eyes</p>
							<Link href="/home">
								<button className="btn btn-primary">Get Started</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}