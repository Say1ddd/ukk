import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

const Create = ({ auth, flash }) => {
    const { data, setData, post, errors, processing } = useForm({
        kategori: '',
        deskripsi: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('kategori.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="text-3xl text-gray-500 leading-tight">Kategori</h2>
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

            <Head title="Kategori" />

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <header>
                <h2 className="text-lg font-medium text-gray-900">Tambah Kategori</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Tambah kategori baru.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="kategori" value="Kategori" />

                    <TextInput
                        id="kategori"
                        className="mt-1 block w-full"
                        value={data.kategori}
                        onChange={(e) => setData('kategori', e.target.value)}
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.kategori} />
                </div>

                <div>
                    <InputLabel htmlFor="deskripsi" value="Deskripsi" />

                    <TextInput
                        id="deskripsi"
                        className="mt-1 block w-full"
                        value={data.deskripsi}
                        onChange={(e) => setData('deskripsi', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.deskripsi} />
                </div>
                    <PrimaryButton className='mt-4 rounded-lg w-full' disabled={processing}>Simpan</PrimaryButton>
                </form>

                    </div>
                </div>
        </AuthenticatedLayout>
    );
};

export default Create;
