import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Option } from './JobSidebar';
import useClearFilter from '@/utils/clearFilter';

interface FilterProps{
    title: string;
    state: string | null;
    setState: React.Dispatch<React.SetStateAction<string | null>>;
    options: Option[];
    changeKey: string;
    onChange?: (key: string, value: string | null) => void;
    extraStyles?: string
    hasBorderBottom?: boolean
}

const FilterCard = ({ title, state, setState, options, changeKey, onChange, extraStyles, hasBorderBottom=true }: FilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // const handleChange = (key: string, value: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set(key, value);
  //   params.set('page', '1'); // Reset to page 1 on filter change
  //   router.push(`/browse-jobs?${params.toString()}`);
  // };

  const handleChange = (key: string, value: string) => {
    setState(value);
    onChange?.(key, value);
  };

  const clearFilter = useClearFilter()

  return (
    <div className={`py-6 space-y-4 ${hasBorderBottom && "border-b border-[#363636]"}`}> 
        <div className='flex justify-between'>
            <h1 className='text-heading text-[16px] font-medium'>{title}</h1>
            <button 
              onClick= {() => clearFilter(setState, changeKey)}
              className='text-[#FB4D5C] cursor-pointer text-[14px] leading-6'>
                Clear all
            </button>
        </div>

        <RadioGroup 
          value={state || ""} 
          onValueChange={(value) => handleChange(changeKey, value)} 
          className='grid grid-cols-2 w-full px-2'>
{/* data-[state=checked]:border-primary */}
            {options?.map((option) => (
               <div key={option.value} className="flex items-center gap-x-2.5 gap-y-4">
                    <RadioGroupItem
                        value={option.value}
                        id={`radio-${title}-${option.value}`}
                        className={`
                          relative w-3.5 h-3.5 border border-gray-300 flex items-center justify-center 
                          appearance-none cursor-pointer transition 
                          data-[state=checked]:outline-none ${extraStyles ? "rounded-full" : "rounded-xs"}
                        `}    
                      />
                    <label
                        htmlFor={`radio-${title}-${option.value}`}
                        className="text-[16px] text-heading font-normal"
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