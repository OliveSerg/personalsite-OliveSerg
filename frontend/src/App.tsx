import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import ExperiencesWrapper from "@features/experiences/experiences-wrapper";
import ContactForm from "@features/contactform/contact-form";
/*
TODO: 
- Generate tagline with LLM
- Get experiences from DB
- Get project spotlight
- 
*/
function App() {
	return (
		<>
			<header className="">Fixed nav</header>
			<div className="hero">
				<h1>Meet Sergio Oliveira:</h1>
				<h2 className="">Empowering Ideas Through Code</h2>
				<img
					src={viteLogo}
					className="background-image"
					alt="S part of logo (SVG)"
				/>
				<img
					src={viteLogo}
					className="background-image"
					alt="O part of logo (SVG)"
				/>
			</div>
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
				<img src={viteLogo} className="virtual-avatar" alt="Avatar" />
			</div>
			<div className="experince-skills">
				<ExperiencesWrapper />
				<p>Loop experince as cards. List cards in json or something</p>
				<p>
					Skill bubbles. Size determines skill level. Highlights when
					experince is focused. Skills as json or something
				</p>
			</div>
			<div className="projects">Project spotlight</div>
			<div className="call-to-action">
				<ContactForm />
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
