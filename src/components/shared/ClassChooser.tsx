'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useClassContext } from '@/context/ClassContext';
import { useUserContext } from '@/context/UserContext';
import { ClassesArray } from '@/lib/constants';
import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '../ui/card';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Define ClassName type explicitly here if it's not imported
type ClassName = 'flankscout' | 'pocketscout' | 'roamersoldier' | 'pocketsoldier' | 'demoman' | 'medic';

// Normalize the class name to ensure it's one of the valid ClassName types
const normalizeClassName = (className: string): ClassName => {
	// e.g., "Flank Scout" becomes "flankscout"
	const normalized = className.replace(/\s+/g, '').toLowerCase();
	// Asserting that the normalized string is a ClassName (safe if ClassesArray is controlled)
	return normalized as ClassName;
};

const ClassChooser = () => {
	// Access the UserContext to get the logged-in user
	const { steamProfile, login } = useUserContext();
	const isUserLoggedIn = !!steamProfile; // Check if user is logged in
	const player = steamProfile && {
		personaname: steamProfile.personaname,
		avatar: steamProfile.avatar,
		steamid: steamProfile.steamid,
	}; // Create player object from steamProfile

	// Access the class context
	const { flankScoutArray, pocketScoutArray, roamerSoldierArray, pocketSoldierArray, demomanArray, medicArray, toggleClass } = useClassContext();

	// Map normalized role names to current array states
	const classStates: Record<ClassName, typeof flankScoutArray> = {
		flankscout: flankScoutArray,
		pocketscout: pocketScoutArray,
		roamersoldier: roamerSoldierArray,
		pocketsoldier: pocketSoldierArray,
		demoman: demomanArray,
		medic: medicArray,
	};

	// Render function for each class array
	const renderClassPlayers = () => {
		// Render each class and its respective players
		return Object.keys(classStates).map((className) => {
			const players = classStates[className as ClassName];

			return (
				<div key={className} className="flex flex-col justify-center items-center gap-1">
					{players.length > 0 &&
						players.map((player, idx) => (
							<Card key={idx} className="flex p-2 bg-card rounded-sm justify-start w-full">
								<div className="flex w-full justify-between items-center">
									<div className="flex gap-2 items-center">
										<Avatar>
											<AvatarImage src={player.avatar} />
										</Avatar>
										<p className="hidden sm:flex text-xs md:text-sm font-semibold text-center">{player.personaname}</p>
									</div>
									<p className="hidden lg:flex text-yellow-500">1000</p>
								</div>
							</Card>
						))}
				</div>
			);
		});
	};

	return (
		<div className="flex flex-col w-full">
			<Card className="flex flex-col gap-2 justify-start border-none bg-background">
				<CardHeader>
					<CardTitle className="text-center capitalize text-4xl">Choose Your Class</CardTitle>
				</CardHeader>
				<div className="grid grid-cols-6 gap-2 pb-4">
					{ClassesArray.map((role, index) => {
						const normalizedClass = normalizeClassName(role.class); // Normalize the class name to ClassName type
						const classState = classStates[normalizedClass];

						// Determine if the card should be disabled
						const isDisabled = !isUserLoggedIn;

						return (
							<AlertDialog key={index}>
								{isDisabled ? (
									<AlertDialogTrigger asChild>
										<Card
											className={`flex flex-col gap-2 justify-center min-h-[100px] items-center border-2 border-input rounded-2xl 
											bg-card cursor-not-allowed`}>
											<Image src={role.imgURL} width={50} height={50} alt={role.alt} />
											<p className="hidden sm:flex text-sm md:text-md font-semibold text-center">{role.class}</p>
										</Card>
									</AlertDialogTrigger>
								) : (
									<Card
										key={index}
										onClick={() => player && toggleClass(normalizedClass, player)} // Pass the player object to toggleClass
										className={`flex flex-col gap-2 justify-center min-h-[100px] items-center border-2 border-input rounded-2xl 
										bg-card hover:bg-gradient-to-tr from-blue-900 via-cyan-700 to-teal-500 duration-500 ease-in-out shadow-2xl py-1
										${classState.some((p) => p.steamid === player?.steamid) ? 'bg-gradient-to-tr from-blue-900 via-cyan-700 to-teal-500' : ''}`}>
										<Image src={role.imgURL} width={50} height={50} alt={role.alt} />
										<p className="hidden sm:flex text-sm md:text-md font-semibold text-center">{role.class}</p>
									</Card>
								)}
								{isDisabled && (
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Please log in to Steam</AlertDialogTitle>
											<AlertDialogDescription>
												You can only queue for pugs once you are logged into your Steam account.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction onClick={login}>Log in</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								)}
							</AlertDialog>
						);
					})}
				</div>
			</Card>

			<div className="grid grid-cols-6 gap-2 pb-4">{renderClassPlayers()}</div>
		</div>
	);
};

export default ClassChooser;
