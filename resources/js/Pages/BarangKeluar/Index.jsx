
import { useState } from 'react';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaPlus } from 'react-icons/fa';

const Title = [
    { value: 'Tanggal' },
    { value: 'Qty_keluar' },
    { value: 'Seri Barang' },
    { value: 'Action' }
]

const Index = ({ auth, barangkeluars, flash }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBarangKeluars = barangkeluars.filter(barangkeluar => (
        barangkeluar.tgl_keluar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barangkeluar.qty_keluar.toString().includes(searchQuery) ||
        barangkeluar.barang.seri.toLowerCase().includes(searchQuery.toLowerCase())
    ))

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

            <div className="mx-auto sm:px-6 lg:px-8">
                <Card title="Tabel Barang Keluar">
                    <Card.Content content={
                        <>
                            <span>Menampilkan seluruh data</span>
                                <Link href={route('barangkeluar.create')}>
                                    <PrimaryButton className='rounded-full'>
                                        Tambah Barang Keluar
                                        <FaPlus className='ml-2' />
                                    </PrimaryButton>
                                </Link>
                            <div className='flex items-center gap-2'>
                                <span>Search:</span>
                                <TextInput 
                                    className='w-80'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} 
                                />
                            </div>
                        </>
                    }>
                <Table>
                    <Table.Head>
                        {Title.map((title, index) => (
                            <Table.Title key={index} value={title.value} />
                        ))}
                    </Table.Head>
                    {filteredBarangKeluars.length > 0 ? (
                    filteredBarangKeluars.map((barangkeluar) => (
                        <Table.Body key={barangkeluar.id}>
                            <Table.Content value={barangkeluar.tgl_keluar} />
                            <Table.Content value={barangkeluar.qty_keluar} />
                            <Table.Content value={barangkeluar.barang.merk + ' ' + barangkeluar.barang.seri} />
                            <Table.Content value=
                            {
                                <div className='flex justify-center gap-2'>
                                <Link href={route('barangkeluar.show', barangkeluar.id)} className='text-blue-500'>Show</Link>
                                <Link href={route('barangkeluar.edit', barangkeluar.id)} className='text-yellow-500'>Edit</Link>
                                <Link as='button' method='delete' href={route('barangkeluar.destroy', barangkeluar.id)} className='text-red-500'>Delete</Link>
                                </div>
                            }
                            />
                        </Table.Body>
                    ))
                ) : (
                    <Table.Body>
                        <Table.Content 
                        value="Data tidak ditemukan!" 
                        colSpan={6} 
                        className=" text-red-500 font-semibold text-xl text-center" 
                        />
                    </Table.Body>
                )}
                    <Table.Foot>
                        {Title.map((title, index) => (
                            <Table.Title key={index} value={title.value} />
                        ))}
                    </Table.Foot>
                </Table>
                </Card.Content>
                </Card>
            </div>
    </AuthenticatedLayout>
)
}

export default Index