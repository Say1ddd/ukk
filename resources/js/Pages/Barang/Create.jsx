import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

const Create = ({ auth, kategoris, flash }) => {
    const { data, setData, post, errors, processing } = useForm({
        merk: '',
        seri: '',
        spesifikasi: '',
        stok: 0,
        kategori_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('barang.store'));
    };

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
                <h2 className="text-lg font-medium text-gray-900">Tambah Barang</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Tambah barang baru.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="merk" value="Merk" />

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
                    <InputLabel htmlFor="seri" value="Seri" />

                    <TextInput
                        id="seri"
                        className="mt-1 block w-full"
                        value={data.seri}
                        onChange={(e) => setData('seri', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.seri} />
                </div>

                <div>
                    <InputLabel htmlFor="spesifikasi" value="Spesifikasi" />

                    <TextInput
                        id="spesifikasi"
                        className="mt-1 block w-full"
                        value={data.spesifikasi}
                        onChange={(e) => setData('spesifikasi', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.spesifikasi} />
                </div>

                <div>
                    <InputLabel htmlFor="stok" value="Stok" />

                    <TextInput
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
                            <option disabled value="">Pilih Kategori</option>
                            {kategoris.map((kategori) => (
                                <option key={kategori.id} value={kategori.id}>
                                    {kategori.deskripsi}
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

export default Create;
