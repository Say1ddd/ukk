import { useState } from 'react';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaPlus } from 'react-icons/fa';

const Title = [
    { value: 'Merk' },
    { value: 'Seri' },
    { value: 'Spesifikasi' },
    { value: 'Stok' },
    { value: 'Kategori' },
    { value: 'Action' }
]

const Index = ({ auth, barangs, flash }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBarangs = barangs.filter(barang => 
        barang.merk.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barang.seri.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barang.spesifikasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barang.stok.toString().includes(searchQuery) ||
        barang.kategori.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

                <div className="mx-auto sm:px-6 lg:px-8">
                    <Card title="Tabel Barang">
                        <Card.Content content={
                        <>
                        <span>Menampilkan seluruh data</span>
                            <Link href={route('barang.create')}>
                                <PrimaryButton className='rounded-full'>
                                    Tambah Barang
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
                                {filteredBarangs.length > 0 ? (
                                    filteredBarangs.map((barang) => (
                                        <Table.Body key={barang.id}>
                                            <Table.Content value={barang.merk} />
                                            <Table.Content value={barang.seri} />
                                            <Table.Content value={barang.spesifikasi} />
                                            <Table.Content value={barang.stok} />
                                            <Table.Content value={barang.kategori.kategori} />
                                            <Table.Content value=
                                            {
                                                <div className='flex justify-center gap-2'>
                                                <Link href={route('barang.show', barang.id)} className='text-blue-500'>Show</Link>
                                                <Link href={route('barang.edit', barang.id)} className='text-yellow-500'>Edit</Link>
                                                <Link as='button' method='delete' href={route('barang.destroy', barang.id)} className='text-red-500'>Delete</Link>
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
