'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import { GiCheckMark } from "react-icons/gi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Image from "next/image";

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

  const [countries, setCountries] = useState<{ name: string }[]>([]);
  const [states, setStates] = useState<{ name: string }[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string | null>("United States");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openState, setOpenState] = useState<boolean>(false);
  const [openCity, setOpenCity] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => res.json())
      .then((data) => setCountries(data.data || []));
  }, []);
    
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    if (selectedCountry) {
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: selectedCountry }),
      })
        .then(res => res.json())
        .then(data => setStates(data.data?.states || []));

      setSelectedState(null);
      setSelectedCity(null);
      setCities([]);
    }
  }, [selectedCountry]);

  // Fetch cities when state is selected
  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: selectedCountry, state: selectedState }),
      })
        .then(res => res.json())
        .then(data => setCities(data.data || []));

      setSelectedCity(null);
    }
  }, [selectedState]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    let countryQueryValue: string | null = selectedCountry;

    // if (selectedCountry === "United States") {
    //   countryQueryValue = "United States";
    // } else if (selectedCountry === "United Kingdom") {
    //   countryQueryValue = "England";
    // }

    if (selectedCountry) params.set("country", countryQueryValue!);
    else params.delete("country");

    if (selectedState) params.set("state", selectedState);
    else params.delete("state");

    if (selectedCity) params.set("city", selectedCity);
    else params.delete("city");

    router.push(`/browse-jobs?${params.toString()}`, { scroll: false });
    onChange({ country: selectedCountry, state: selectedState, city: selectedCity });
  }, [selectedCountry, selectedState, selectedCity]);

const clearAll = () => {
    setSelectedCountry("United States");
    setSelectedState(null);
    setSelectedCity(null);
    setStates([]);
    setCities([]);
    onChange({ country: null, state: null, city: null });

    const params = new URLSearchParams(searchParams.toString());
    params.set("country", "United States");
    params.delete("state");
    params.delete("city");


    router.push(`/browse-jobs?${params.toString()}`);
  };
    

  return (
    <div className='py-6 space-y-4 border-b border-[#363636]'>
        <div className='flex justify-between'>
            <h1 className='text-heading 2xl:text-[16px] max-2xl:text-[14px] font-medium'>Location</h1>
            <button
                onClick={clearAll}
                className='text-neutral text-[14px] leading-6 cursor-pointer'>
                    Clear
            </button>
        </div>

        {/* Select Country */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild >
            <div className='w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-2.5 px-4 flex items-center justify-between date_overlay'>
              <p className="text-neutral text-sm leading-6">{selectedCountry ? selectedCountry : "Enter city, state, or country"}</p> 
              <Image src='/arrow-down.svg' width={14} height={14} alt='arrow down icon'/>

            </div>
          </PopoverTrigger>
            
          <PopoverContent className="w-auto p-0 border-none">
            <div className="bg-[#101217] px-6 py-3 border-[#363636] border rounded-xl date_overlay min-w-[220px] max-h-[420px] overflow-y-auto hide-scrollbar">
              {countries.map((country) => (
                <div className="text-start w-full cursor-pointer" key={country.name}>
                  <div
                    key={country.name} 
                    onClick={() => {
                        setOpen(false)
                        setSelectedCountry(country.name)
                      }
                    }
                    className="py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px] space-x-4 flex items-center">
                      <div
                        className={`
                          relative w-3.5 h-3.5 border border-gray-300 flex items-center justify-center 
                          ${selectedCountry === country.name && 'border-primary'}
                        `}
                      >
                        {selectedCountry === country.name && <GiCheckMark color="#D1FF17" size={12}/>}
                      </div>
                      <p>{country.name}</p>
                      
                  </div>
                </div>
              ))}

            </div>
          </PopoverContent>
        </Popover>


        {states.length > 0 && (
        <Popover open={openState} onOpenChange={setOpenState}>
          <PopoverTrigger asChild >
            <div className='w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-2.5 px-4 flex items-center justify-between date_overlay'>

              <p className="text-neutral text-sm leading-6">{selectedState ? selectedState : "Select State"}</p> 
              <Image src='/arrow-down.svg' width={14} height={14} alt='arrow down icon'/>

            </div>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0 border-none">
            <div className="bg-[#101217] px-6 py-3 border-[#363636] border rounded-xl date_overlay min-w-[220px] max-h-[420px] overflow-y-auto hide-scrollbar">
              {states.map((state) => (
                <div className="text-start w-full cursor-pointer" key={state.name}>
                  <div
                    key={state.name} 
                    onClick={() => {
                        setOpenState(false)
                        setSelectedState(state.name)
                      }
                    }
                    className="py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px] space-x-4 flex items-center">
                      <div
                        className={`
                          relative w-3.5 h-3.5 border border-gray-300 flex items-center justify-center 
                          ${selectedState && 'border-primary'}
                        `}
                      >
                        {selectedState === state.name && <GiCheckMark color="#D1FF17" size={12}/>}
                      </div>
                      <p>{state.name}</p>
                      
                  </div>
                </div>
              ))}

            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* City Select */}
      {cities.length > 0 && (
        <Popover open={openCity} onOpenChange={setOpenCity}>
          <PopoverTrigger asChild >
            <div className='w-full rounded-lg cursor-pointer bg-[#101217] border border-gray py-2.5 px-4 flex items-center justify-between date_overlay'>

              <p className="text-neutral text-sm leading-6">{selectedCity ? selectedCity : "Select City"}</p> 
              <Image src='/arrow-down.svg' width={14} height={14} alt='arrow down icon'/>

            </div>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0 border-none">
            <div className="bg-[#101217] px-6 py-3 border-[#363636] border rounded-xl date_overlay min-w-[220px] max-h-[420px] overflow-y-auto hide-scrollbar">
              {cities.map((city) => (
                <div className="text-start w-full cursor-pointer" key={city}>
                  <div
                    key={city} 
                    onClick={() => {
                        setOpenCity(false)
                        setSelectedCity(city)
                      }
                    }
                    className="py-4 border-b border-[#363636] text-[#F8F6F0] leading-6 2xl:text-[16px] max-2xl:text-[14px] space-x-4 flex items-center">
                      <div
                        className={`
                          relative w-3.5 h-3.5 border border-gray-300 flex items-center justify-center 
                          ${selectedCity && 'border-primary'}
                        `}
                      >
                        {selectedCity === city && <GiCheckMark color="#D1FF17" size={12}/>}
                      </div>
                      <p>{city}</p>
                      
                  </div>
                </div>
              ))}

            </div>
          </PopoverContent>
        </Popover>
      )}

        
    </div>
  )
}

export default CountryFilter