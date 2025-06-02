import AssetData from "@/components/AssetData";


const fetchMaintenance = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PAGE_URL}/api/assets`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const revalidate = 0

export default async function Home() {


  const data = await fetchMaintenance();

  if (!data?.success) {
    return (
      <main className="bg-[#181823] min-h-screen flex items-center 
      justify-center text-white md:!p-16 !p-8">
        <div className="text-center w-full h-fit bg-[#232533] 
        rounded-lg border-2 border-gray-500 !p-6">
          <h2 className="text-2xl font-semibold">Failed to Fetch</h2>
          <p className="mt-2">Something went wrong while fetching data.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#181823] min-h-screen flex items-center 
    justify-center md:!p-10 !p-6">
      <AssetData data={data?.data}/>
    </main>
  );
}
