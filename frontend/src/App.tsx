import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
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
				<p>Loop experince as cards. List cards in json or something</p>
				<p>
					Skill bubbles. Size determines skill level. Highlights when
					experince is focused. Skills as json or something
				</p>
			</div>
			<div className="projects">Project spotlight</div>
			<div className="call-to-action">
				<p>Contact form</p>
				<form action="api/contact/" method="post">
					<input type="text" name="name" id="name" />
					<input type="email" name="from_email" id="email" />
					<input type="tel" name="phone" id="phone" />
					<input type="text" name="company" id="company" />
					<textarea name="message" id="message"></textarea>
				</form>
				<p>VA interview</p>
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
