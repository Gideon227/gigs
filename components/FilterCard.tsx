import React, { SetStateAction } from 'react';
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import { Option } from './JobSidebar';

interface FilterProps{
    title: string;
    state: string | null;
    setState: React.Dispatch<React.SetStateAction<string | null>>;
    options: Option[]
    handleValueChange: (key:string, value:any) => void
    changeKey: string
}

const FilterCard = ({ title, state, setState, options, handleValueChange, changeKey }: FilterProps) => {

  return (
    <div className='py-2.5 space-y-4'> 
        <div className='flex justify-between'>
            <h1 className='text-heading 2xl:text-[16px] max-2xl:text-[16px] font-medium'>{title}</h1>
            <button onClick={() => setState(null)} className='text-[#FB4D5C] cursor-pointer text-[14px] leading-6'>Clear all</button>
        </div>

        <RadioGroup 
          defaultValue={state ?? ""} 
          onValueChange={(value) => handleValueChange(changeKey!, value)} 
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