import {
	Navbar,
	Welcome,
	Footer,
	Services,
	Transactions,
} from '../components/index';

const HomePage = () => {
	return (
		<>
			<div className="gradient-bg-welcome">
				<Navbar />
				<Welcome />
			</div>
			<Services />
			<Transactions />
			<Footer />
		</>
	);
};

export default HomePage;
