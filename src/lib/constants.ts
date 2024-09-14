interface Role {
	imgURL: string;
	class: string;
	alt: string;
}

export const ClassesArray: Role[] = [
	{
		imgURL: '/assets/scout.png',
		class: 'Flank Scout',
		alt: 'scout-flank',
	},
	{
		imgURL: '/assets/scout.png',
		class: 'Pocket Scout',
		alt: 'scout-pocket',
	},
	{
		imgURL: '/assets/soldier.png',
		class: 'Roamer Soldier',
		alt: 'soldier-roamer',
	},
	{
		imgURL: '/assets/soldier.png',
		class: 'Pocket Soldier',
		alt: 'soldier-pocket',
	},
	{
		imgURL: '/assets/demoman.png',
		class: 'Demoman',
		alt: 'demoman',
	},
	{
		imgURL: '/assets/medic.png',
		class: 'Medic',
		alt: 'medic',
	},
];
