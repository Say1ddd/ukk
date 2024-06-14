import SmallCard from '@/Components/SmallCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { HiArchive, HiViewGridAdd } from 'react-icons/hi';
import { RiInboxArchiveFill, RiInboxUnarchiveFill } from 'react-icons/ri';

export default function Dashboard({ auth, barangCount, kategoriCount, barangMasukCount, barangKeluarCount}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-3xl text-gray-500 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex gap-6 overflow-hidden sm:rounded-lg">
                            <SmallCard href={route('barang.index')} className="flex-grow">
                                <SmallCard.Content icon={<HiArchive className='w-12 h-auto text-gray-200'/>}>
                                    <div className='font-bold'>Barang</div>
                                    {barangCount ? (
                                        <div className="text-sm font-semibold">{barangCount}</div>
                                    ) : (
                                        <div className="text-sm font-semibold text-red-500">Data Kosong</div>
                                    )}
                                </SmallCard.Content>
                            </SmallCard>
                            <SmallCard href={route('kategori.index')} className="flex-grow">
                                <SmallCard.Content icon={<HiViewGridAdd className='w-12 h-auto text-gray-200'/>}>
                                <div className='font-bold'>Kategori</div>
                                    {kategoriCount ? (
                                        <div className="text-sm font-semibold">{kategoriCount}</div>
                                    ) : (
                                        <div className="text-sm font-semibold text-red-500">Data Kosong</div>
                                    )}
                                </SmallCard.Content>
                            </SmallCard>
                            <SmallCard href={route('barangmasuk.index')} className="flex-grow">
                                <SmallCard.Content icon={<RiInboxArchiveFill className='w-12 h-auto text-gray-200'/>}>
                                <div className='font-bold'>Barang Masuk</div>
                                    {barangMasukCount ? (
                                        <div className="text-sm font-semibold">{barangMasukCount}</div>
                                    ) : (
                                        <div className="text-sm font-semibold text-red-500">Data Kosong</div>
                                    )}
                                </SmallCard.Content>
                            </SmallCard>
                            <SmallCard href={route('barangkeluar.index')} className="flex-grow">
                                <SmallCard.Content icon={<RiInboxUnarchiveFill className='w-12 h-auto text-gray-200'/>}>
                                <div className='font-bold'>Barang Keluar</div>
                                    {barangKeluarCount ? (
                                        <div className="text-sm font-semibold">{barangKeluarCount}</div>
                                    ) : (
                                        <div className="text-sm font-semibold text-red-500">Data Kosong</div>
                                    )}
                                </SmallCard.Content>
                            </SmallCard>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
