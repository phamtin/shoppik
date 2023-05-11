import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LoggedInUser = {
	_id: string;
	email: string;
	firstname: string;
	lastname: string;
	role: string;
};

interface AuthStore {
	currentUser: LoggedInUser | null;
	setCurrentUser: (user: LoggedInUser) => void;
	removeCurrentUser: () => void;
}

const store = create<AuthStore>()(
	persist(
		(set) => ({
			currentUser: null,

			setCurrentUser: (user) => {
				if (!user) return;

				return set((state) => ({
					currentUser: {
						email: user.email,
						_id: user._id,
						firstname: user.firstname,
						lastname: user.lastname,
						role: user.role,
					},
				}));
			},
			removeCurrentUser: () => {
				set((state) => ({
					currentUser: null,
				}));
			},
		}),
		{
			name: "auth-storage",
		}
	)
);

export const useAuthStore = store;
