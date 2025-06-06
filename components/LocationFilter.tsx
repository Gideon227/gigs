'use client';

import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";


const LocationFilter = () => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    // const countries = Country.getAllCountries();
    // const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
    // const cities = selectedState ? City.getCitiesOfState(selectedCountry!, selectedState!) : [];
  return (
    <div className='py-2.5 space-y-2'>
        <div className='flex justify-between'>
            <h1 className='text-heading 2xl:text-[16px] max-2xl:text-[14px] font-medium'>Filter</h1>
            <button className='text-[#FB4D5C] text-[14px] leading-6'>Clear all</button>
        </div>

        <Select onValueChange={(val) => {
            setSelectedCountry(val);
            setSelectedState(null);
            setSelectedCity(null);
        }}>
            <SelectTrigger className="w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-2.5 px-4 flex items-center justify-between date_overlay text-neutral text-sm leading-6">
                <SelectValue placeholder="Enter city, state, or country" />
            </SelectTrigger>
            
            <SelectContent>
                {/* {countries.map((country) => (
                    <SelectItem
                        key={country.isoCode}
                        value={country.isoCode}
                        className="hover:bg-white hover:text-black"
                        >
                            <div className="flex space-x-2 items-center">
                                <span></span>
                                {country.name}
                            </div>
                    </SelectItem>
                ))} */}
            </SelectContent>
        </Select>

        <input 
            type='text'
            onChange={() => {}}
            placeholder='Enter city, state, zip, or country'
            className=''
        />
    </div>
  )
}

export default LocationFilter