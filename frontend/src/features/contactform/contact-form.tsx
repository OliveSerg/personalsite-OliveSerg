import { ContactInputs } from "@features/contactform/types/inputs";
import { useForm, SubmitHandler } from "react-hook-form";

const ContactForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactInputs>();

	const onSubmit: SubmitHandler<ContactInputs> = (data) => {
		console.log(data);
		if (data.contact_me) {
			return;
		}
	};

	return (
		<form
			action={import.meta.env.VITE_API_URL + "contact"}
			onSubmit={handleSubmit(onSubmit)}
			method="POST">
			<input
				type="checkbox"
				value="1"
				style={{ display: "none" }}
				tabIndex="-1"
				autoComplete="off"
				{...register("contact_me")}
			/>
			<div className="pt-0 mb-3">
				<input
					type="text"
					placeholder="Your name"
					className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
					{...register("name", {
						required: true,
						maxLength: {
							value: 40,
							message: "No one's name is this long...",
						},
					})}
				/>
				{errors.name && <p>{errors.name.message}</p>}
			</div>
			<div className="pt-0 mb-3">
				<input
					type="email"
					placeholder="Email"
					className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
					{...register("from_email", {
						required: true,
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Invalid email address",
						},
					})}
				/>
				{errors.from_email && <p>{errors.from_email.message}</p>}
			</div>
			<div className="pt-0 mb-3">
				<input
					type="tel"
					placeholder="Phone"
					className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
					{...register("phone", {
						required: true,
						pattern: {
							value: /^(?:(?:\+1)|(?:1-))?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
							message: "Incorrect phone number",
						},
					})}
				/>
				{errors.phone && <p>{errors.phone.message}</p>}
			</div>
			<div className="pt-0 mb-3">
				<input
					type="company"
					placeholder="Company"
					className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
					{...register("company", {
						maxLength: {
							value: 100,
							message:
								"Company name too long. Maybe consider rebranding...",
						},
					})}
				/>
				{errors.company && <p>{errors.company.message}</p>}
			</div>
			<div className="pt-0 mb-3">
				<textarea
					placeholder="Your message"
					className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
					{...register("message", { required: true })}
				/>
				{errors.message && <p>{errors.message.message}</p>}
			</div>
			<div className="pt-0 mb-3">
				<button
					className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
					type="submit">
					Send a message
				</button>
			</div>
		</form>
	);
};

export default ContactForm;
