'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { ClassesArray } from '@/lib/utils';
import Image from 'next/image';
import ClassLock from './ClassLock';

const MatchMaker = () => {
	return (
		<Card className="flex flex-col gap-2 justify-start w-full text-white m-6 py-6 h-1/2 border-none bg-background">
			<CardHeader>
				<CardTitle className="text-center capitalize">choose your class</CardTitle>
			</CardHeader>
			<div className="grid grid-cols-6 gap-2 pb-4">
				{ClassesArray.map((role, index) => (
					<Card
						key={index}
						className="flex flex-col bg-card justify-center min-h-[100px] items-center border-2 border-input rounded-2xl hover:scale-105 hover:bg-gradient-to-tr from-blue-900 via-cyan-700 to-teal-500 duration-500 ease-in-out shadow-2xl py-1">
						<Image src={role.imgURL} width={50} height={50} alt={role.alt} />
						<h1 className="hidden sm:flex text-sm text-center">{role.class}</h1>
					</Card>
				))}
			</div>
			<ClassLock />
		</Card>
	);
};

export default MatchMaker;
