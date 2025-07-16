// utils/generateSlug.ts
export const generateJobSlug = (title: string, company: string, country: string, id: string | number) => {
  const stopWords = ['a', 'the', 'to', 'with', 'and', 'for', 'in', 'on', 'at', 'of'];
  
  const sanitize = (text: string) =>
    text
      .toLowerCase()
      .split(/\s+/)
      .filter(word => !stopWords.includes(word))
      .join('-')
      .replace(/[^a-z0-9\-]/g, '');

  const slugTitle = sanitize(title);
  const slugCompany = sanitize(company);
  const slugCountry = sanitize(country);

  return `${slugTitle}-${slugCompany}-${slugCountry}-job-${id}`;
}
