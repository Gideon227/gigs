export async function getRelatedJobs (jobId: string) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
        throw new Error('Environment variable BACKEND_URL is not defined');
      }
    console.log("backend running")
    try {
        const response = await fetch(`${backendUrl}/${jobId}/related-jobs`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
        });
          
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Failed to fetch related jobs: ${response.status} ${response.statusText} - ${errorText}`);
        }
        
        return response.json()
    } catch (error: any) {
        console.error('Error fetching related jobs:', error.message || error);
        throw new Error("Unable to fetch related jobs from the backend.");
    }
}