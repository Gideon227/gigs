

export function formatNumber(input: string): string {
    // const cleaned = input.replace(
    //   /([^\s\d\.,\-\u2013\u2014]+)(?=\d)/g,
    //   ''
    // );
    
    return input.replace(
      /\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?/g,
      (numStr) => {
        const n = parseFloat(numStr.replace(/,/g, ''));
        if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (n >= 1_000)         return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        return numStr; 
      }
    );
  }
  