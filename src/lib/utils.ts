import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface Role {
	imgURL: string;
	class: string;
	alt: string;
}

export const ClassesArray: Role[] = [
	{
		imgURL: '/assets/scout-flank.jpeg',
		class: 'Flank Scout',
		alt: 'scout-flank',
	},
	{
		imgURL: '/assets/scout-pocket.jpg',
		class: 'Pocket Scout',
		alt: 'scout-pocket',
	},
	{
		imgURL: '/assets/soldier-roamer.jpg',
		class: 'Roamer',
		alt: 'soldier-roamer',
	},
	{
		imgURL: '/assets/soldier-pocket.jpg',
		class: 'Pocket Soldier',
		alt: 'soldier-pocket',
	},
	{
		imgURL: '/assets/demoman.jpg',
		class: 'Demoman',
		alt: 'demoman',
	},
	{
		imgURL: '/assets/medic.jpg',
		class: 'Medic',
		alt: 'medic',
	},
];
