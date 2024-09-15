'use client';

import { useClassContext } from '@/context/ClassContext';
import { ClassesArray } from '@/lib/constants';
import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '../ui/card';

// Define ClassName type explicitly here if it's not imported
type ClassName = 'flankscout' | 'pocketscout' | 'roamersoldier' | 'pocketsoldier' | 'demoman' | 'medic';

// Normalize the class name to ensure it's one of the valid ClassName types
const normalizeClassName = (className: string): ClassName => {
	// e.g., "Flank Scout" becomes "flankscout"
	const normalized = className.replace(/\s+/g, '').toLowerCase();
	// Asserting that the normalized string is a ClassName (safe if ClassesArray is controlled)
	return normalized as ClassName;
};

const ChooseClass = () => {
	// Simulated user
	const user = 'beppoh';

	// Access the class context
	const { flankScoutArray, pocketScoutArray, roamerSoldierArray, pocketSoldierArray, demomanArray, medicArray, toggleClass } = useClassContext();

	// Map normalized role names to current array states
	const classStates: Record<ClassName, string[]> = {
		flankscout: flankScoutArray,
		pocketscout: pocketScoutArray,
		roamersoldier: roamerSoldierArray,
		pocketsoldier: pocketSoldierArray,
		demoman: demomanArray,
		medic: medicArray,
	};

	// Render function for each class array
	const renderClassPlayers = () => {
		return Object.keys(classStates).map((className) => {
			const players = classStates[className as ClassName];
			return (
				<div key={className} className="flex flex-col gap-1">
					{players.length > 0 &&
						players.map((player, idx) => (
							<div key={idx} className="flex justify-center items-center px-2 py-1 border-none bg-card rounded-sm">
								{player}
							</div>
						))}
				</div>
			);
		});
	};

	return (
		<div className="flex flex-col w-full">
			<Card className="flex flex-col gap-2 justify-start border-none bg-background">
				<CardHeader>
					<CardTitle className="text-center capitalize text-4xl">choose your class</CardTitle>
				</CardHeader>
				<div className="grid grid-cols-6 gap-2 pb-4">
					{ClassesArray.map((role, index) => {
						const normalizedClass = normalizeClassName(role.class); // normalize the class name to ClassName type
						const classState = classStates[normalizedClass];

						return (
							<Card
								key={index}
								onClick={() => toggleClass(normalizedClass, user)}
								className={`flex flex-col gap-2 bg-card justify-center min-h-[100px] items-center border-2 border-input rounded-2xl 
                hover:bg-gradient-to-tr from-blue-900 via-cyan-700 to-teal-500 duration-500 ease-in-out shadow-2xl py-1
                ${classState.includes(user) ? 'bg-gradient-to-tr from-blue-900 via-cyan-700 to-teal-500' : ''}`}>
								<Image src={role.imgURL} width={50} height={50} alt={role.alt} />
								<p className="hidden sm:flex text-sm md:text-md font-semibold text-center">{role.class}</p>
							</Card>
						);
					})}
				</div>
			</Card>

			<div className="grid grid-cols-6 gap-2 pb-4">{renderClassPlayers()}</div>
		</div>
	);
};

export default ChooseClass;
