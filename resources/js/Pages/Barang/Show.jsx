import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import { Head } from '@inertiajs/react';

const Show = ({ auth, barang, flash }) => {
const barangNama = barang.merk + ' - ' + barang.seri;
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <>
            <h2 className="text-3xl text-gray-500 leading-tight">Barang</h2>
            {flash.success && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4" role="alert">
                <p className="font-bold">Success</p>
                <p>{flash.success}</p>
            </div>}
            {flash.error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                <p className="font-bold">Error</p>
                <p>{flash.error}</p>
            </div>}
        </>
        }
    >

      <Head title="Barang" />

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                <h2 className="text-lg font-medium text-gray-900 capitalize">{barangNama}</h2>

                <p className="mt-1 text-sm text-gray-600">
                id: {barang.id}
                </p>
            </header>
            <ul className='mt-6 space-y-6'>
          <li className='mt-1 block w-full'>
            <InputLabel>Seri</InputLabel>
            <span>{barang.seri}</span>
          </li>
          <li className='mt-1 block w-full'>
            <InputLabel>Spesifikasi</InputLabel>
            <span>{barang.spesifikasi}</span>
          </li>
          <li className='mt-1 block w-full'>
            <InputLabel>Stok</InputLabel>
            <span>{barang.stok}</span>
          </li>
          <li className='mt-1 block w-full'>
            <InputLabel>Kategori</InputLabel>
            <span>{barang.kategori.deskripsi} ({barang.kategori.kategori})</span>
          </li>
          </ul>
      </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Show