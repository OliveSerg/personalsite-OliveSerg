import SLogo from "./assets/S img.svg";
import OLogo from "./assets/O img.svg";
import "./App.css";
import ExperiencesWrapper from "@features/experiences/experiences-wrapper";
import ContactForm from "@features/contactform/contact-form";
import HeaderSocial from "@features/socials/header-social";
import DiagonalLine from "@features/background-layers/diagonal-line";
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
		<div className="relative overflow-hidden">
			<DiagonalLine
				skew="skew-y-[130deg]"
				offset="-top-[50vw]"
				color="from-scarlet-600 to-sunglow-600"
			/>
			<DiagonalLine
				skew="skew-y-[130deg]"
				offset="-top-[40vw]"
				color="from-scarlet-600 to-sunglow-600"
			/>
			<DiagonalLine
				skew="skew-y-[130deg]"
				offset="top-[60%]"
				color="from-scarlet-600 to-sunglow-600"
			/>
			<DiagonalLine
				skew="skew-y-[130deg]"
				offset="top-[70%]"
				color="from-scarlet-600 to-sunglow-600"
			/>
			<DiagonalLine
				skew="skew-y-[130deg]"
				offset="top-[90%]"
				color="from-scarlet-600 to-sunglow-600"
			/>
			<DiagonalLine
				skew="skew-y-[130deg]"
				offset="top-[100%]"
				color="from-scarlet-600 to-sunglow-600"
			/>
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
			<section className="hero mb-30">
				<div className="grid max-w-screen-xl mx-auto grid-cols-10 px-6 mb-10">
					<div className="my-40 row-span-full col-start-1 col-span-6 self-center z-10">
						<h1 className="max-w-2xl italic text-2xl md:text-3xl lg:text-4xl tracking-tight leading-none">
							Meet Sergio Oliveira
						</h1>
						<p className="max-w-2xl text-4xl md:text-5xl lg:text-6xl font-extrabold">
							Empowering Ideas Through Code
						</p>
					</div>
					<div className="relative col-start-5 col-span-6 row-span-full self-center">
						<img
							className="absolute top-0"
							src={SLogo}
							alt="mockup"
						/>
						<img className="" src={OLogo} alt="mockup" />
					</div>
				</div>
			</section>
			<div className="container my-20 mx-auto grid grid-cols-12 gap-4 py-8 px-6 backdrop-blur-m rounded">
				<div className="col-span-12 md:col-span-7">
					<h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide uppercase">
						About Me
					</h2>
					<p>
						I'm an experienced Developer with a diverse skill set
						encompassing various programming languages, software
						tools, and platforms, along with a strong background in
						AI and machine learning. My insatiable appetite for
						learning has driven my success in the tech industry,
						propelling me to explore new and challenging subjects.
						When faced with high pressure situations, I maintain
						composure, stay focused, and exhibit natural leadership
						qualities, helping to foster direction amidst chaos.
					</p>
				</div>
				<img
					src=""
					className="col-span-12 md:col-span-5"
					alt="Avatar"
				/>
			</div>
			<section className="experince-skills my-20">
				<ExperiencesWrapper />
			</section>
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
		</div>
	);
}

export default App;
