import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Option } from './JobSidebar';
import useClearFilter from '@/utils/clearFilter';
import Image from 'next/image';

interface FilterProps{
  setPage: (value: any) => void;
  title: string;
  options: Option[];
  state: string[] | string | null;
  setState: (value: any) => void;
  changeKey: string;
  onChange: (key: string, value: string) => void;
  extraStyles?: string;
  hasBorderBottom?: boolean;
  isMulti?: boolean;
}

const FilterCard = ({ setPage, title, state, setState, options, changeKey, onChange, extraStyles, hasBorderBottom=true, isMulti = false }: FilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (option: Option) => {
    if (isMulti) {
      const selected = new Set(state as string[]);
      if (selected.has(option.value)) {
        selected.delete(option.value);
      } else {
        selected.add(option.value);
      }
      const newState = Array.from(selected);
      setState(newState);
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete(changeKey);
      newState.forEach(value => updatedParams.append(changeKey, value));
      router.replace(`/browse-jobs?${updatedParams.toString()}`, { scroll: false });
    } else {
      const current = state as string | null;
      const newValue = current === option.value ? null : option.value;
      setState(newValue);
      onChange(changeKey, newValue!);
    }
  };

  const isSelected = (optionValue: string): boolean => {
    if (isMulti) {
      return (state as string[]).includes(optionValue);
    }
    return state === optionValue;
  };

  const handleChange = (key: string, value: string) => {
    if (!isMulti) {
      setState(value);
      onChange?.(key, value);
    }
  };

  const clearFilter = useClearFilter()

  return (
    <div className={`py-6 space-y-4 ${hasBorderBottom && "border-b border-[#363636]"}`}> 
        <div className='flex justify-between'>
            <h1 className='text-heading text-[16px] font-medium'>{title}</h1>
            <button 
              onClick= {() => {
                setState(isMulti ? [] : null);
                const updatedParams = new URLSearchParams(searchParams.toString());
                updatedParams.delete(changeKey);
                if (changeKey === 'salary'){
                  updatedParams.delete('minSalary');
                  updatedParams.delete('maxSalary');
                  
                }
                updatedParams.set("page", "1");
                // setPage(1);
                router.replace(`/browse-jobs?${updatedParams.toString()}`, { scroll: false });
              }}
              className='text-neutral cursor-pointer text-[14px] leading-6'>
                Clear
            </button>
        </div>

        <div className='grid grid-cols-2 w-full px-2 gap-y-2'>
            {options?.map((option) => (
              <div key={option.value} className="flex items-center gap-x-2.5 gap-y-4 cursor-pointer" onClick={() => handleClick(option)}>
                  <div
                    className={`
                      relative w-3.5 h-3.5 border border-gray-300 flex items-center justify-center 
                      ${extraStyles ? "rounded-full" : "rounded-xs"}
                      ${isSelected(option.value) ? 'bg-primary' : 'bg-transparent'}
                    `}
                  />
                    {/* <Image src='/' width={14} height={14} alt='check' className='text-primary'/>
                  </div> */}
                  <label
                    className="text-[16px] max-md:text-[14px] text-heading font-normal"
                    >
                    {option.label}
                  </label>
             </div> 
          ))}
        </div>
    </div>
  )
}

export default FilterCard