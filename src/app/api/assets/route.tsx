


export async function GET(req: Request){
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tofa/assets`);

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            statusText: response.statusText,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), {
            status: 500,
            statusText: 'Internal Server Error',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}