import { createContext, useContext, ReactNode, useState } from "react";
import { User } from "./types/user";

type Props = {
	children: ReactNode;
};

type Context = {
	user: User | null;
	setUser: (user: User | null) => void;
};

const UserContext = createContext<Context | undefined>(undefined);

const UserProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

const useUser = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("Method must be used within UserProvider");
	}

	return context;
};

export { UserProvider, useUser };
