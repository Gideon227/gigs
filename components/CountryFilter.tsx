'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import { getAllCountries, getStatesOfCountry, getCitiesOfState } from "@/libs/location-utils";

interface CountryFilterCardProps {
    
    onChange: (filters: {
        country: string | null;
        state: string | null;
        city: string | null;
    }) => void;
}

const CountryFilter = ({ onChange }: CountryFilterCardProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [countries, setCountries] = useState<{ name: string; isoCode: string }[]>([]);
    const [states, setStates] = useState<{ name: string; isoCode: string }[]>([]);
    const [cities, setCities] = useState<{ name: string }[]>([]);

    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (selectedCountry) params.set('country', selectedCountry);
        else params.delete('country');
      
        if (selectedState) params.set('state', selectedState);
        else params.delete('state');
      
        if (selectedCity) params.set('city', selectedCity);
        else params.delete('city');
      
        params.set('page', '1'); // Reset page
        router.push(`/browse-jobs?${params.toString()}`);
      }, [selectedCountry, selectedState, selectedCity]);

    useEffect(() => {
        setCountries(getAllCountries());
    }, []);
    
    useEffect(() => {
        if (selectedCountry) {
          setStates(getStatesOfCountry(selectedCountry));
          setSelectedState(null);
          setCities([]);
          setSelectedCity(null);
        }
    }, [selectedCountry]);
    
    useEffect(() => {
        if (selectedCountry && selectedState) {
          setCities(getCitiesOfState(selectedCountry, selectedState));
          setSelectedCity(null);
        }
    }, [selectedState]);
    
    useEffect(() => {
        onChange({ country: selectedCountry, state: selectedState, city: selectedCity });
    }, [selectedCountry, selectedState, selectedCity]);
    
    const clearAll = () => {
        setSelectedCountry(null);
        setSelectedState(null);
        setSelectedCity(null);
        setStates([]);
        setCities([]);
        onChange({ country: null, state: null, city: null });
    };
    

  return (
    <div className='py-6 space-y-4 border-b border-[#363636]'>
        <div className='flex justify-between'>
            <h1 className='text-heading 2xl:text-[16px] max-2xl:text-[14px] font-medium'>Location</h1>
            <button
                onClick={() => {clearAll}}
                className='text-[#FB4D5C] text-[14px] leading-6 cursor-pointer'>
                    Clear all
            </button>
        </div>

        <Select value={selectedCountry ?? ''} onValueChange={(val) => setSelectedCountry(val)}>
            <SelectTrigger className="w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-3.5 px-4 flex items-center justify-between date_overlay text-neutral text-sm leading-6">
                <SelectValue placeholder="Enter city, state, or country" />
            </SelectTrigger>
            
            <SelectContent>
                {countries.map((country) => (
                    <div className="space-y-6 p-4">
                        <SelectItem
                            key={country.isoCode} value={country.isoCode}
                            className="hover:bg-white hover:text-black"
                            >
                                <div className="flex space-x-2 items-center">
                                    {country.name}
                                </div>
                        </SelectItem>

                    </div>
                ))}
            </SelectContent>
        </Select>


        {states.length > 0 && (
        <Select value={selectedState ?? ''} onValueChange={(val) => setSelectedState(val)}>
          <SelectTrigger className='w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-3.5 px-4 flex items-center justify-between date_overlay text-neutral text-sm leading-6'>
            <SelectValue placeholder='Select State' />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.isoCode} value={state.isoCode}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* City Select */}
      {cities.length > 0 && (
        <Select value={selectedCity ?? ''} onValueChange={(val) => setSelectedCity(val)}>
          <SelectTrigger className='w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-3.5 px-4 flex items-center justify-between date_overlay text-neutral text-sm leading-6'>
            <SelectValue placeholder='Select City' />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

        
    </div>
  )
}

export default CountryFilter