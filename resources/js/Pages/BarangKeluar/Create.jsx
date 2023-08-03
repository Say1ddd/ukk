import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

const Create = ({ auth, barangs, flash }) => {
    const today = new Date().toISOString().split('T')[0];

    const { data, setData, processing, post, errors } = useForm({
        tgl_keluar: today,
        qty_keluar: '',
        barang_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('barangkeluar.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="text-3xl text-gray-500 leading-tight">Barang Keluar</h2>
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

            <Head title="Barang Keluar" />

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                <h2 className="text-lg font-medium text-gray-900">Tambah Barang Keluar</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Kurangi Stok Barang.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="qty_keluar" value="Qty_keluar Pengeluaran" />

                    <TextInput
                        id="qty_keluar"
                        className="mt-1 block w-full"
                        value={data.qty_keluar}
                        onChange={(e) => setData('qty_keluar', e.target.value)}
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.qty_keluar} />
                </div>

                <div className='flex gap-12 items-center justify-start'>
                    <div>
                        <InputLabel htmlFor="barang" value="Barang" />
                        <select
                            value={data.barang_id}
                            onChange={(e) => setData('barang_id', e.target.value)}
                        >
                            <option value='' disabled>Pilih Barang</option>
                            {barangs.map((barang) => (  
                                <option key={barang.slug} value={barang.id}>
                                    [{barang.merk}] {barang.seri}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.kategori_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="tgl_keluar" value="Tanggal Keluar (hari ini)" />
                        <input
                            type="date"
                            id="tgl_keluar"
                            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            value={data.tgl_keluar}
                            onChange={(e) => setData('tgl_keluar', e.target.value)}
                        />
                        <InputError message={errors.tgl_keluar} className="mt-2" />
                    </div>
                </div>

                    <PrimaryButton className='mt-4 rounded-lg w-full' disabled={processing}>Simpan</PrimaryButton>
                </form>

                    </div>
                </div>
        </AuthenticatedLayout>
    );
};

export default Create;
