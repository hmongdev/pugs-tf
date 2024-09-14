'use client';

import { ClassesArray } from '@/lib/utils';
import Image from 'next/image';

const HomePage = () => {
	return (
		<div className="flex flex-col gap-2 w-full text-white m-6">
			<div className="grid grid-cols-6 gap-2">
				{ClassesArray.map((role, index) => (
					<div
						key={index}
						className="flex flex-col bg-card justify-center items-center border-2 border-input rounded-2xl hover:scale-110 duration-500 ease-in-out shadow-2xl">
						<Image src={role.imgURL} width={50} height={50} alt={role.alt} />
						<h1>{role.class}</h1>
					</div>
				))}
			</div>
			<div className="grid grid-cols-6 gap-2 border rounded-2xl h-1/2"></div>
		</div>
	);
};

export default HomePage;
