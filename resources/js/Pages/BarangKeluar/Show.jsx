import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import { Head } from '@inertiajs/react';

const Show = ({ auth, barangkeluar }) => {
  const barang = barangkeluar.barang.merk + ' - ' + barangkeluar.barang.seri;
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-3xl text-gray-500 leading-tight capitalize">Menampilkan Barang Keluar: {barang}</h2>}
    >
      <Head title="Barang Keluar" />

      <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                <h2 className="text-lg font-medium text-gray-900 capitalize">{barang}</h2>

                <p className="mt-1 text-sm text-gray-600">
                id: {barangkeluar.id}
                </p>
            </header>
            <ul className='mt-6 space-y-6'>
          <li className='mt-1 block w-full'>
            <InputLabel>Tanggal Keluar</InputLabel>
            <span>{barangkeluar.tgl_keluar}</span>
          </li>
          <li className='mt-1 block w-full'>
            <InputLabel>Qty_masuk</InputLabel>
            <span>{barangkeluar.qty_masuk}</span>
          </li>
          <li className='mt-1 block w-full capitalize'>
            <InputLabel>Barang</InputLabel>
            <span>{barang}</span>
          </li>
          </ul>
      </div>
      </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Show