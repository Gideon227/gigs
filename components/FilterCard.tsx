import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import { Option } from './JobSidebar';

interface FilterProps{
    title: string;
    state: string | null;
    setState: React.Dispatch<React.SetStateAction<string | null>>;
    options: Option[];
    changeKey: string
}

const FilterCard = ({ title, state, setState, options, changeKey }: FilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className='py-2.5 space-y-4'> 
        <div className='flex justify-between'>
            <h1 className='text-heading 2xl:text-[16px] max-2xl:text-[16px] font-medium'>{title}</h1>
            <button onClick={() => setState(null)} className='text-[#FB4D5C] cursor-pointer text-[14px] leading-6'>Clear all</button>
        </div>

        <RadioGroup 
          defaultValue={state ?? ""} 
          onValueChange={(value) => handleChange(changeKey, value)} 
          className='grid grid-cols-2 w-full px-2'>

            {options?.map((option) => (
               <div key={option.value} className="flex items-center gap-2">
                    <RadioGroupItem
                        value={option.value}
                        id={`radio-${title}-${option.value}`}
                        className="rounded-xs" 
                    />
                    <label
                        htmlFor={`radio-${title}-${option.value}`}
                        className="text-[14px] text-heading "
                        >
                        {option.label}
                    </label>
               </div> 
            ))}

        </RadioGroup>  
    </div>
  )
}

export default FilterCard