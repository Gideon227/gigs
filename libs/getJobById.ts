export async function getJobById(id: string) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      throw new Error('Environment variable BACKEND_URL is not defined');
    }
    try {
        const response = await fetch(`${backendUrl}/${id}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
        });
          
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Failed to fetch job: ${response.status} ${response.statusText} - ${errorText}`);
        }
        
        return response.json()
    } catch (error: any) {
        console.error('Error fetching job:', error.message || error);
        throw new Error("Unable to fetch job from the backend.");
    }   
}