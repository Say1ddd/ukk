
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
    { value: 'Qty_masuk' },
    { value: 'Seri Barang' },
    { value: 'Action' }
]

const Index = ({ auth, barangmasuks, flash }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBarangMasuks = barangmasuks.filter(barangmasuk => (
        barangmasuk.tgl_masuk.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barangmasuk.qty_masuk.toString().includes(searchQuery) ||
        barangmasuk.barang.seri.toLowerCase().includes(searchQuery.toLowerCase())
    ))

return (
    <AuthenticatedLayout
        user={auth.user}
        header={
            <>
                <h2 className="text-3xl text-gray-500 leading-tight">Barang Masuk</h2>
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

        <Head title="Barang Masuk" />

            <div className="mx-auto sm:px-6 lg:px-8">
                <Card title="Tabel Barang Masuk">
                    <Card.Content content={
                        <>
                            <span>Menampilkan seluruh data</span>
                                <Link href={route('barangmasuk.create')}>
                                    <PrimaryButton className='rounded-full'>
                                        Tambah Barang Masuk
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
                    {filteredBarangMasuks.length > 0 ? (
                    filteredBarangMasuks.map((barangmasuk) => (
                        <Table.Body key={barangmasuk.id}>
                            <Table.Content value={barangmasuk.tgl_masuk} />
                            <Table.Content value={barangmasuk.qty_masuk} />
                            <Table.Content value={barangmasuk.barang.merk + ' ' + barangmasuk.barang.seri} />
                            <Table.Content value=
                            {
                                <div className='flex justify-center gap-2'>
                                <Link href={route('barangmasuk.show', barangmasuk.id)} className='text-blue-500'>Show</Link>
                                <Link href={route('barangmasuk.edit', barangmasuk.id)} className='text-yellow-500'>Edit</Link>
                                <Link as='button' method='delete' href={route('barangmasuk.destroy', barangmasuk.id)} className='text-red-500'>Delete</Link>
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