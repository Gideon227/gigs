import Image from 'next/image';
import React from 'react'

interface LastLineImageProps {
    text: string;
    imageUrl: string;
    imageAlt?: string;
    lastWordCount?: number; // default to 1
}

function splitLastWords(text: string, count: number = 1) {
    const words = text.trim().split(/\s+/);
    if (words.length <= count) {
      return { leading: '', trailing: words.join(' ') };
    }
    const trailing = words.slice(-count).join(' ');
    const leading = words.slice(0, -count).join(' ');
    return { leading, trailing };
}

const LastLineImage: React.FC<LastLineImageProps> = ({
    text,
    imageUrl,
    imageAlt = 'icon',
    lastWordCount = 1,
  }) => {
    const { leading, trailing } = splitLastWords(text, lastWordCount);
         
    return (
        <h1 className="text-[32px] font-semibold leading-[48px] text-start text-heading max-lg:text-[27px] max-lg:leading-[40px] max-md:text-[25px] max-md:leading-[35px]">
          {leading && <>{leading}&nbsp;</>}
          <span className="whitespace-nowrap inline-flex items-center gap-2 max-md:-mt-3">
            {trailing}
            <Image src={imageUrl} alt={imageAlt} width={68} height={68} className="inline-block" />
          </span>
        </h1>
    );
}

export default LastLineImage