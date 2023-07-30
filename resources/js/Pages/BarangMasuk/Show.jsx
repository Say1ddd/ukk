import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import { Head } from '@inertiajs/react';

const Show = ({ auth, barangmasuk }) => {
  const barang = barangmasuk.barang.merk + ' - ' + barangmasuk.barang.seri;
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-3xl text-gray-500 leading-tight capitalize">Menampilkan Barang Masuk: {barang}</h2>}
    >
      <Head title="Barang Masuk" />

      <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                <h2 className="text-lg font-medium text-gray-900 capitalize">{barang}</h2>

                <p className="mt-1 text-sm text-gray-600">
                id: {barangmasuk.id}
                </p>
            </header>
            <ul className='mt-6 space-y-6'>
          <li className='mt-1 block w-full'>
            <InputLabel>Tanggal Masuk</InputLabel>
            <span>{barangmasuk.tgl_masuk}</span>
          </li>
          <li className='mt-1 block w-full'>
            <InputLabel>qty_masuk</InputLabel>
            <span>{barangmasuk.qty_masuk}</span>
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