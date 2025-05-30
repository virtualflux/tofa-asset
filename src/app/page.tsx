import AssetData from "@/components/AssetData";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

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

export default async function Home({ searchParams }: Props) {


  const data = await fetchMaintenance();

  if (!data?.success) {
    return (
      <main className="bg-[#181823] min-h-screen flex items-center justify-center text-white">
        <div className="text-center md:w-[500px] w-full h-fit bg-[#232533] 
        rounded-lg border-2 border-gray-500 !p-6">
          <h2 className="text-2xl font-semibold">Failed to Fetch</h2>
          <p className="mt-2">Something went wrong while fetching data.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#181823] min-h-screen flex items-center 
    justify-center md:p-12 !p-6">
      <AssetData data={data?.data}/>
    </main>
  );
}
