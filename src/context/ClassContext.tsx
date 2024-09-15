'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

// Define allowed class names as a type
type ClassName = 'flankscout' | 'pocketscout' | 'roamersoldier' | 'pocketsoldier' | 'demoman' | 'medic';

// Define Player type
interface Player {
	personaname: string;
	avatar: string;
	steamid: string;
}

// Define the shape of the context
interface ClassContextType {
	flankScoutArray: Player[];
	pocketScoutArray: Player[];
	roamerSoldierArray: Player[];
	pocketSoldierArray: Player[];
	demomanArray: Player[];
	medicArray: Player[];
	toggleClass: (className: ClassName, player: Player) => void;
}

// Create a default context value
const ClassContext = createContext<ClassContextType | undefined>(undefined);

// Provide the context to components
export const ClassProvider = ({ children }: { children: ReactNode }) => {
	// States for each class containing Player objects
	const [flankScoutArray, setFlankScoutArray] = useState<Player[]>([]);
	const [pocketScoutArray, setPocketScoutArray] = useState<Player[]>([]);
	const [roamerSoldierArray, setRoamerSoldierArray] = useState<Player[]>([]);
	const [pocketSoldierArray, setPocketSoldierArray] = useState<Player[]>([]);
	const [demomanArray, setDemomanArray] = useState<Player[]>([]);
	const [medicArray, setMedicArray] = useState<Player[]>([]);

	// Function to toggle a class
	const toggleClass = (className: ClassName, player: Player) => {
		// Map each class to its respective state and setter
		const classMap: Record<ClassName, { state: Player[]; setState: React.Dispatch<React.SetStateAction<Player[]>> }> = {
			flankscout: { state: flankScoutArray, setState: setFlankScoutArray },
			pocketscout: { state: pocketScoutArray, setState: setPocketScoutArray },
			roamersoldier: { state: roamerSoldierArray, setState: setRoamerSoldierArray },
			pocketsoldier: { state: pocketSoldierArray, setState: setPocketSoldierArray },
			demoman: { state: demomanArray, setState: setDemomanArray },
			medic: { state: medicArray, setState: setMedicArray },
		};

		const classData = classMap[className];

		// Check if the player is already in the class
		if (classData.state.some((p) => p.steamid === player.steamid)) {
			// Remove player if they already exist
			classData.setState(classData.state.filter((p) => p.steamid !== player.steamid));
		} else {
			// Add player if they are not in the class
			classData.setState([...classData.state, player]);
		}
	};

	return (
		<ClassContext.Provider
			value={{
				flankScoutArray,
				pocketScoutArray,
				roamerSoldierArray,
				pocketSoldierArray,
				demomanArray,
				medicArray,
				toggleClass,
			}}>
			{children}
		</ClassContext.Provider>
	);
};

// Custom hook to use the class context
export const useClassContext = () => {
	const context = useContext(ClassContext);
	if (!context) {
		throw new Error('useClassContext must be used within a ClassProvider');
	}
	return context;
};
