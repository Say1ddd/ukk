import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import { Head } from '@inertiajs/react';

const Show = ({ auth, kategori }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-3xl text-gray-500 leading-tight capitalize">Menampilkan Kategori: {kategori.deskripsi}</h2>}
    >
      <Head title="Kategori" />

      <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                <h2 className="text-lg font-medium text-gray-900 capitalize">{kategori.deskripsi} ({kategori.kategori})</h2>

            </header>
            <ul className='mt-6 space-y-6'>
          <li className='mt-1 block w-full'>
            <InputLabel>Kategori</InputLabel>
            <span>{kategori.kategori}</span>
          </li>
          <li className='mt-1 block w-full'>
            <InputLabel>Deskripsi</InputLabel>
            <span>{kategori.deskripsi}</span>
          </li>
          </ul>
      </div>
      </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Show