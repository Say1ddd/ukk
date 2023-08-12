import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import AuthLayout from '@/Layouts/AuthLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <AuthLayout image="login">
            <Head title="Log in" />

            <div className='text-center text-2xl text-gray-700 mb-6'>Selamat datang!</div>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 px-6 py-4 block w-full placeholder:text-xs"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Enter Email Address..."
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 px-6 py-4 block w-full placeholder:text-xs"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Ingat saya</span>
                    </label>
                </div>

                <div className="flex flex-col items-center justify-center mt-4">
                    <PrimaryButton className="w-full rounded-full" disabled={processing}>
                        Login
                    </PrimaryButton>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>
            </form>
        </AuthLayout>
    );
}
