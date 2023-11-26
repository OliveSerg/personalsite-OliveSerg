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
			className="grid grid-cols-2 gap-2"
			action={import.meta.env.VITE_API_URL + "contact"}
			onSubmit={handleSubmit(onSubmit)}
			method="POST">
			<input
				type="checkbox"
				value="1"
				tabIndex="-1"
				autoComplete="off"
				className="hidden"
				{...register("contact_me")}
			/>
			<div className="mb-3">
				<input
					type="text"
					placeholder="Your name"
					className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
					{...register("name", {
						required: "This is required",
						maxLength: {
							value: 40,
							message: "No one's name is this long...",
						},
					})}
				/>
				{errors.name && (
					<p className="text-red-500 text-xs italic">
						{errors.name.message}
					</p>
				)}
			</div>
			<div className="mb-3">
				<input
					type="email"
					placeholder="Email"
					className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
					{...register("from_email", {
						required: "This is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Invalid email address",
						},
					})}
				/>
				{errors.from_email && (
					<p className="text-red-500 text-xs italic">
						{errors.from_email.message}
					</p>
				)}
			</div>
			<div className="mb-3">
				<input
					type="tel"
					placeholder="Phone"
					className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
					{...register("phone", {
						required: "This is required",
						pattern: {
							value: /^(?:(?:\+1)|(?:1-))?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/,
							message: "Incorrect phone number",
						},
					})}
				/>
				{errors.phone && (
					<p className="text-red-500 text-xs italic">
						{errors.phone.message}
					</p>
				)}
			</div>
			<div className="mb-3">
				<input
					type="company"
					placeholder="Company (Optional)"
					className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
					{...register("company", {
						maxLength: {
							value: 100,
							message:
								"Company name too long. Maybe consider rebranding...",
						},
					})}
				/>
				{errors.company && (
					<p className="text-red-500 text-xs italic">
						{errors.company.message}
					</p>
				)}
			</div>
			<div className="col-span-full mb-3">
				<textarea
					placeholder="Your message"
					className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
					{...register("message", { required: "This is required" })}
				/>
				{errors.message && (
					<p className="text-red-500 text-xs italic">
						{errors.message.message}
					</p>
				)}
			</div>
			<div className="col-span-full mb-3 text-center">
				<button
					className="active:bg-scarlet-600 hover:shadow-lg focus:outline-none px-6 py-3 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-scarlet-500 rounded shadow outline-none"
					type="submit">
					Send the Bits and Bytes
				</button>
			</div>
		</form>
	);
};

export default ContactForm;
