import { ContactInputs } from "@features/contactform/types/inputs";
import { fetchApiResponse } from "@features/utilities/api";
import { useForm, SubmitHandler } from "react-hook-form";
import "@features/contactform/css/index.css";

const ContactForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		setError,
	} = useForm<ContactInputs>();

	const onSubmit: SubmitHandler<ContactInputs> = async (data) => {
		if (data.contact_me) {
			return;
		}
		try {
			return fetchApiResponse("contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
		} catch (error) {
			const err = error as Error;
			setError("root.api_error", {
				message: err.message,
			});
		}
	};

	if (isSubmitSuccessful) {
		return (
			<div>
				<div className="check-animation mb-4">
					<svg
						viewBox="0 0 65 51"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7 25L27.3077 44L58.5 7"
							stroke="white"
							stroke-width="13"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<h4 className="text-2xl text-center mb-2">
					🚀 Message Sent! 🚀
				</h4>
				<p className="text-center">
					Your message just joined the elite club of successfully
					transmitted bits and bytes. It's like the VIP section of the
					internet, but with fewer velvet ropes. Expect a reply soon!
				</p>
			</div>
		);
	}

	if (isSubmitting) {
		return (
			<div>
				<svg
					className="animate-spin mx-auto mb-8 h-28 w-28 text-scarlet-700"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24">
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<p className="text-center">
					Dispatching your digital carrier pigeon... Sit tight!
				</p>
			</div>
		);
	}

	return (
		<form
			className="grid grid-cols-2 gap-2"
			action={import.meta.env.VITE_API_URL + "contact"}
			onSubmit={handleSubmit(onSubmit)}
			method="POST">
			{errors.root?.api_error && (
				<div className="col-span-full mb-3">
					<p className="text-red-500 text-sm italic">
						Oops! It seems like there's a bug in sending your
						request. Double-check and try again, or send a carrier
						pigeon as a backup. If the problem persists, contact
						your friendly neighborhood developer (that's me!) for
						assistance.
					</p>
				</div>
			)}
			<input
				type="checkbox"
				value="1"
				tabIndex={-1}
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
