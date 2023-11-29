import SLogo from "./assets/S img.svg";
import OLogo from "./assets/O img.svg";
import "./App.css";
import ExperiencesWrapper from "@features/experiences/experiences-wrapper";
import ContactForm from "@features/contactform/contact-form";
import HeaderSocial from "@features/socials/header-social";
/*
TODO: 
- Generate tagline with LLM
- Get project spotlight
- 
*/
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

function App() {
	return (
		<>
			<div className="fixed top-10 right-10 flex flex-row gap-4 z-50">
				<HeaderSocial
					icon={<FaGithubSquare />}
					text="OliveSerg"
					link="https://www.github.com/OliveSerg"
				/>
				<HeaderSocial
					icon={<FaLinkedin />}
					text="SergioOliveira"
					link="http://linkedin.com/in/sergio-o-83a820126"
				/>
				<HeaderSocial
					icon={<FaEnvelope />}
					text="oliveserg@gmail.com"
					link="mailto:oliveserg@gmail.com"
				/>
			</div>
			<section className="hero">
				<div className="grid max-w-screen-xl mx-auto grid-cols-12 px-6 mb-10">
					<div className="my-40 place-self-center col-[1_/_span_7] row-[1] z-10">
						<h1 className="max-w-2xl italic text-2xl md:text-3xl lg:text-4xl tracking-tight leading-none">
							Meet Sergio Oliveira
						</h1>
						<p className="max-w-2xl text-4xl md:text-5xl lg:text-6xl font-extrabold">
							Empowering Ideas Through Code
						</p>
					</div>
					<div className="relative col-[5_/_span_12] row-[1] place-self-center">
						<img
							className="absolute top-0"
							src={SLogo}
							alt="mockup"
						/>
						<img className="" src={OLogo} alt="mockup" />
					</div>
				</div>
			</section>
			<div className="about">
				<h3>About Me:</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit
					esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
					occaecat cupidatat non proident, sunt in culpa qui officia
					deserunt mollit anim id est laborum.
				</p>
				<img src="" className="virtual-avatar" alt="Avatar" />
			</div>
			<div className="experince-skills">
				<ExperiencesWrapper />
			</div>
			<div className="projects">Project spotlight</div>
			<div className="bg-scarlet-500 grid grid-cols-1 justify-items-center p-8">
				<div className="max-w-screen-sm w-full p-4 bg-white rounded">
					<h3 className="text-4xl mb-4">Drop Me a Line</h3>
					<p className="mb-6">
						Drop me a Line, Not a Bug! Let's Chat, Debug, and Maybe
						Conspire on the Virtual World!
					</p>
					<ContactForm />
				</div>
			</div>
			<footer>
				<span>socials</span>
				<span>Name:email</span>
				<span>other</span>
			</footer>
		</>
	);
}

export default App;
