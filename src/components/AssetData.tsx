'use client'
import React, { useState } from 'react'
import logo from '@images/tofa.png'
import Image from 'next/image'


interface IAssets {
  _id: string;
  asset_code: string;
  last_valuator_value: string;
  asset_name: string;
  type_of_asset: string;
  insurance_policy_number: string;
  used_as_collateral: string;
  condition_field: string;
  zoho_id: string;
  maintenances: MaintenanceItem[];
}

interface MaintenanceResponse {
  data: IAssets[];
}

interface MaintenanceItem {
  company: {
    name: string;
  };
  customer: {
    first_name: string;
    last_name: string;
    zoho_id: string;
  };
  _id: string;
  preferred_date_1: string;
  preferred_date_2: string;
  email: string;
  due_date: string;
  priority: string;
  phone_number: string;
  work_order_title: string;
  type_field: string;
  preferred_time: string;
  preference_note: string;
  summary: string;
  zoho_id: string;
  __v: number;
}

interface IModal {
  isOpen: boolean;
  title: string;
  maintenance: MaintenanceItem[]
}

const AssetData: React.FC<MaintenanceResponse> = ({data}) => {
  const [openModal, setOpenModal] = useState<IModal>({
    isOpen: false,
    title: '',
    maintenance: []
  })
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(asset =>
    asset.asset_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.asset_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.zoho_id.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className='w-full h-fit bg-[#232533] 
    rounded-lg border-2 border-gray-500 !p-6'>
        <div className='w-full flex items-center justify-between gap-8'>
          <Image
          src={logo}
          width={100}
          height={100}
          alt='Logo'
          className='rounded-full'
          />
          <button onClick={()=>window.history.back()} className='!py-2 !px-2 bg-gray-200 text-black 
            rounded-3xl text-sm cursor-pointer'>
              {"<"} Go BAck 
          </button>
        </div>

        <div className="overflow-x-auto !mt-7 ">
          <div className='mb-4 flex items-center justify-between'>
            <h1 className='text-xl font-bold text-white underline'>
              Assets List
            </h1>
            <input
              type="text"
              placeholder="Search by name or code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px] !p-2 rounded-md bg-[#181823] text-white border 
              border-gray-500 outline-none placeholder:text-sm"
            />
          </div>
          <div className='w-full max-h-[500px] overflow-y-auto !mt-2'>
            {
              filteredData.length === 0 ? (
                <p className='mt-4 text-sm text-gray-100 italic text-center'>
                  No result found!
                </p>
              ) : (
                <table className="min-w-full shadow-md rounded-lg overflow-hidden !p-6 !bg-[#2B2D3A] 
                text-[#CCCCCC] border-2 border-[#3D3F51] !mt-4" style={{background: '#2B2D3A'}}>
                  <thead>
                    <tr className='bg-[#33354A]'>
                      <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Asset Code</th>
                      <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Asset Name</th>
                      <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Type</th>
                      <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Insurance No</th>
                      <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Collateral</th>
                      <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Condition</th>
                      <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Action</th>
                    </tr>
                  </thead>
                  <tbody className='overflow-y-auto'>
                    {
                      filteredData.map((item: IAssets) => (
                        <tr key={item._id} className="hover:bg-[#3A3C4F]">
                          <td className="!px-4 !py-3 text-sm capitalize">
                            {item.asset_code || "N/A"}
                          </td>
                          <td className="!px-4 !py-3 text-sm capitalize">
                            {item.asset_name || "N/A"}
                          </td>
                          <td className="!px-4 !py-3 text-sm capitalize">
                            {item.type_of_asset}
                          </td>
                          <td className="!px-4 !py-3 text-sm capitalize">
                            {item.insurance_policy_number || "N/A"}
                          </td>
                          <td className="!px-4 !py-3 text-sm capitalize">
                            {item.used_as_collateral || "N/A"}
                          </td>
                          <td className="!px-4 !py-3 text-sm capitalize">
                            {item.condition_field || "N/A"}
                          </td>
                          <td>
                            <button
                            className='!p-2 bg-red-500 rounded-lg text-white text-center text-xs cursor-pointer'
                            onClick={()=>setOpenModal({isOpen: true, title: item.asset_name, maintenance: item.maintenances})}
                            >
                              Maintenances
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              )
            }
          </div>
        </div>
        

        {
          openModal.isOpen &&
          <div onClick={()=>setOpenModal({isOpen: false, title: '', maintenance: []})}
          className='w-full h-screen bg-black/15 fixed top-0 right-0 flex 
          items-center justify-center animate-fadein md:!p-16 !p-8'>
            <div className='w-full bg-[#181823] !p-2 rounded-lg'
            onClick={(e)=>e.stopPropagation()}>
              <div className='w-full flex items-center justify-between'>
                  <h1 className='text-xl font-bold text-white underline mb-4'>
                    {openModal.title} Maintenance List
                  </h1>
                  <button onClick={()=>setOpenModal({isOpen: false, title: '', maintenance: []})}
                  className='!px-2 rounded-full bg-red-200 text-red-700 cursor-pointer'>
                    X
                  </button>
              </div>
              <div className="overflow-x-auto !mt-7 !mb-4">
                {
                  openModal.maintenance.length > 0 ? (
                    <table className="min-w-full shadow-md rounded-lg overflow-hidden !p-6 !bg-[#2B2D3A] 
                    text-[#CCCCCC] border-2 border-[#3D3F51] !mt-4" style={{background: '#2B2D3A'}}>
                      <thead>
                        <tr className='bg-[#33354A]'>
                          <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Title</th>
                          <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Type</th>
                          <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0] min-w-[150px]">Preferred Dates</th>
                          <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0] min-w-[120px]">Due Date</th>
                          <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Priority</th>
                          <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Time</th>
                          <th className="!px-4 !py-3 text-left text-sm font-semibold text-[#E0E0E0]">Summary</th>
                        </tr>
                      </thead>
                      <tbody >
                        {
                          openModal.maintenance.map((item: MaintenanceItem) => (
                            <tr key={item._id} className="hover:bg-[#3A3C4F]">
                              <td className="!px-4 !py-2 text-sm capitalize">
                                {item.work_order_title || "N/A"}
                              </td>
                              <td className="!px-4 !py-2 text-sm capitalize">
                                {item.type_field || "N/A"}
                              </td>
                              <td className="!px-4 !py-2 text-sm capitalize">
                                {item.preferred_date_1 + ", " +  item.preferred_date_2}
                              </td>
                              <td className="!px-4 !py-2 text-sm capitalize">
                                {item.due_date || "N/A"}
                              </td>
                              <td className="!px-4 !py-2 text-sm capitalize">
                                {item.priority || "N/A"}
                              </td>
                              <td className="!px-4 !py-2 text-sm capitalize">
                                {item.preferred_time || "N/A"}
                              </td>
                              <td className="!px-4 !py-2 text-sm capitalize">
                                {item.summary || "N/A"}
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  ) : (
                    <div className='w-full !mt-5 flex items-center justify-center'>
                      <h1 className='text-lg text-white font-bold italic'>
                        No maintenance found for this asset
                      </h1>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        }

    </div>
  )
}

export default AssetData