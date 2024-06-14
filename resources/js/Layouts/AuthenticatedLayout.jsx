import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import SideLink from '@/Components/SideLink';
import { HiArchive, HiViewGridAdd } from "react-icons/hi";
import { RiInboxArchiveFill, RiInboxUnarchiveFill } from "react-icons/ri";
import { FaBell, FaEnvelope, FaLaughWink, FaSearch, FaTachometerAlt } from "react-icons/fa";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div
            className="border-r border-gray-200 w-56"
            style={{
                backgroundColor: '#4e73df',
                backgroundImage: 'linear-gradient(180deg, #4e73df 10%, #224abe 100%)',
                backgroundSize: 'cover'
            }}
            >
            <div className="flex flex-col justify-start items-center">
                <div className='flex items-center justify-center py-4 px-2 gap-4 text-white'>
                    <Link href="/">
                        <FaLaughWink className='-rotate-12 h-8 w-auto' />
                    </Link>
                    <p className='font-black text-md tracking-widest'>SINVENT</p>
                </div>
                <span className='w-48 h-px bg-gray-100/25'></span>
            </div>
                <SideLink href={route('dashboard')} active={route().current('dashboard')}>
                    <FaTachometerAlt className='text-lg' />
                    <p>Dashboard</p>
                </SideLink>
                <div className='flex flex-col justify-center items-center'>
                    <span className='w-48 h-px bg-gray-100/25'></span>
                </div>
                <p className="ps-4 mt-4 uppercase text-xs text-white/50 font-bold">Tabel Induk</p>
                    <SideLink href={route('barang.index')} active={route().current('barang.*')}>
                        <HiArchive className='text-lg' />
                        <p>Barang</p>
                    </SideLink>
                    <SideLink href={route('kategori.index')} active={route().current('kategori.*')}>
                        <HiViewGridAdd className='text-lg' />
                        <p>Kategori</p>
                    </SideLink>
                    <div className='flex flex-col justify-center items-center'>
                        <span className='w-48 h-px bg-gray-100/25'></span>
                    </div>
                    <p className="ps-4 mt-4 uppercase text-xs text-white/50 font-bold">Transaksi</p>
                    <SideLink href={route('barangmasuk.index')} active={route().current('barangmasuk.*')}>
                        <RiInboxArchiveFill className='text-lg' />
                        <p>Barang Masuk</p>
                    </SideLink>
                    <SideLink href={route('barangkeluar.index')} active={route().current('barangkeluar.*')}>
                        <RiInboxUnarchiveFill className='text-lg' />
                        <p>Barang Keluar</p>
                    </SideLink>
                    <div className='flex flex-col justify-center items-center'>
                        <span className='w-48 h-px bg-gray-100/25'></span>
                    </div>
                </div>

            <div className="flex flex-col flex-1">
                <nav className="bg-white border-b border-gray-100 shadow-md">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <div className="hidden sm:flex">
                                    <div className='flex items-center text-sm p-2 bg-gray-100/75 text-gray-400 rounded-s-md w-80'>
                                        <p>Search for...</p>
                                    </div>
                                    <span className='text-white rounded-e-md p-3' style={{backgroundColor: "#2e59d9"}}>
                                        <FaSearch />
                                    </span>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <FaBell className='text-gray-400' />
                                <FaEnvelope className='text-gray-400 ms-6' />
                            <span className='ms-6 h-12 w-px bg-gray-200'></span>
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex gap-2 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                            {user.name}
                                            <img src="/storage/undraw_profile.svg" alt="profile image" className='w-8 h-auto' />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>



                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

                {header && (
                    <header className="bg-transparent">
                        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
