import { RegistrationInputs } from "./types/inputs";
import { useForm, SubmitHandler } from "react-hook-form";
import { authenticateUser } from "./services/auth-service";
import { useUser } from "./user-context";

type Props = {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegistrationForm = ({ setIsModalOpen }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		setError,
	} = useForm<RegistrationInputs>();
	const { setUser } = useUser();

	const onSubmit: SubmitHandler<RegistrationInputs> = async (
		data: RegistrationInputs
	) => {
		if (data.contact_me) {
			return;
		}
		try {
			const token = await authenticateUser(data.name, data.from_email);
			setIsModalOpen(true);
			setUser({
				name: data.name,
				email: data.from_email,
				company: data.company,
				token: token,
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
			<button
				className="active:bg-scarlet-600 hover:shadow-lg focus:outline-none px-6 py-3 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-scarlet-500 rounded shadow outline-none"
				type="button"
				onClick={() => setIsModalOpen(true)}>
				Return to Interview
			</button>
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
						strokeWidth="4"></circle>
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
			action={import.meta.env.VITE_API_URL + "interviews/"}
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
			<div className="mb-3 col-span-full">
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

export default RegistrationForm;
