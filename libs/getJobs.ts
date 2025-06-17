export async function getJobs (query : String | String[] | number | number[] | boolean) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      throw new Error('Environment variable BACKEND_URL is not defined');
    }
    console.log("backend running")
    try {
        const response = await fetch(`${backendUrl}?${query}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
        });
          
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText} - ${errorText}`);
        }
        
        return response.json()
    } catch (error: any) {
        console.error('Error fetching jobs:', error.message || error);
        throw new Error("Unable to fetch jobs from the backend.");
    }   
}