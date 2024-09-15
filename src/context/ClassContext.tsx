'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

// Define allowed class names as a type
type ClassName = 'flankscout' | 'pocketscout' | 'roamersoldier' | 'pocketsoldier' | 'demoman' | 'medic';

// Define the shape of the context
interface ClassContextType {
	flankScoutArray: string[];
	pocketScoutArray: string[];
	roamerSoldierArray: string[];
	pocketSoldierArray: string[];
	demomanArray: string[];
	medicArray: string[];
	toggleClass: (className: ClassName, user: string) => void;
}

// Create a default context value
const ClassContext = createContext<ClassContextType | undefined>(undefined);

// Provide the context to components
export const ClassProvider = ({ children }: { children: ReactNode }) => {
	// States
	const [flankScoutArray, setFlankScoutArray] = useState<string[]>([]);
	const [pocketScoutArray, setPocketScoutArray] = useState<string[]>([]);
	const [roamerSoldierArray, setRoamerSoldierArray] = useState<string[]>([]);
	const [pocketSoldierArray, setPocketSoldierArray] = useState<string[]>([]);
	const [demomanArray, setDemomanArray] = useState<string[]>([]);
	const [medicArray, setMedicArray] = useState<string[]>([]);

	// Function to toggle a class
	const toggleClass = (className: ClassName, user: string) => {
		const classMap: Record<ClassName, { state: string[]; setState: React.Dispatch<React.SetStateAction<string[]>> }> = {
			flankscout: { state: flankScoutArray, setState: setFlankScoutArray },
			pocketscout: { state: pocketScoutArray, setState: setPocketScoutArray },
			roamersoldier: { state: roamerSoldierArray, setState: setRoamerSoldierArray },
			pocketsoldier: { state: pocketSoldierArray, setState: setPocketSoldierArray },
			demoman: { state: demomanArray, setState: setDemomanArray },
			medic: { state: medicArray, setState: setMedicArray },
		};

		const classData = classMap[className];

		if (classData.state.includes(user)) {
			classData.setState(classData.state.filter((player) => player !== user)); // remove user
		} else {
			classData.setState([...classData.state, user]); // add user
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
