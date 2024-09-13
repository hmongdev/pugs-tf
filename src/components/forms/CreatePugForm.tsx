'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { PopoverContent } from '../ui/popover';

const formats = [
	{
		value: '6s',
		label: '6s',
	},
];

const CreatePugForm = () => {
	// States
	const [open, setOpen] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');

	return (
		<div>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
						{value ? formats.find((mode) => mode.value === value)?.label : 'Select Format'}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Select Format" />
						<CommandList>
							<CommandEmpty>No game mode found.</CommandEmpty>
							<CommandGroup>
								{formats.map((framework) => (
									<CommandItem
										key={framework.value}
										value={framework.value}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? '' : currentValue);
											setOpen(false);
										}}>
										<Check className={cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')} />
										{framework.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<Button>Create Pug</Button>
		</div>
	);
};

export default CreatePugForm;
