import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

const Edit = ({ auth, barang, kategoris }) => {
    const barangNama = barang.merk + ' - ' + barang.seri;
    const { data, setData, put, errors, processing } = useForm({
        merk: barang.merk || '',
        seri: barang.seri || '',
        spesifikasi: barang.spesifikasi || '',
        stok: barang.stok || 0,
        kategori_id: barang.kategori_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('barang.update', barang.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-3xl text-gray-500 leading-tight">Barang</h2>}
        >

        <Head title="Barang" />

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                <h2 className="text-lg font-medium text-gray-900">{barangNama}</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Edit Barang.
                </p>
            </header>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="merk" value="Merk Barang" />

                    <TextInput
                        id="merk"
                        className="mt-1 block w-full"
                        value={data.merk}
                        onChange={(e) => setData('merk', e.target.value)}
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.merk} />
                </div>

                <div>
                    <InputLabel htmlFor="seri" value="Seri Barang" />

                    <TextInput
                        id="seri"
                        className="mt-1 block w-full"
                        value={data.seri}
                        onChange={(e) => setData('seri', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.seri} />
                </div>

                <div>
                    <InputLabel htmlFor="spesifikasi" value="Spesifikasi Barang" />

                    <TextInput
                        id="spesifikasi"
                        className="mt-1 block w-full"
                        value={data.spesifikasi}
                        onChange={(e) => setData('spesifikasi', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.spesifikasi} />
                </div>

                <div>
                    <InputLabel htmlFor="stok" value="Stok Barang" />

                    <TextInput
                        disabled
                        id="stok"
                        className="mt-1 block w-full"
                        value={data.stok}
                        onChange={(e) => setData('stok', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.stok} />
                </div>

                <div className='flex gap-12 items-center justify-start'>
                    <div>
                        <InputLabel htmlFor="kategori" value="Kategori" />
                        <select
                            value={data.kategori_id}
                            onChange={(e) => setData('kategori_id', e.target.value)}
                        >
                            <option value='' disabled>Pilih Kategori</option>
                            {kategoris.map((kategori) => (  
                                <option key={kategori.id} value={kategori.id}>
                                    {kategori.deskripsi} ({kategori.kategori})
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.kategori_id} className="mt-2" />
                    </div>
                </div>

                    <PrimaryButton className='mt-4 rounded-lg w-full' disabled={processing}>Simpan</PrimaryButton>
                </form>
            </div>
        </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
