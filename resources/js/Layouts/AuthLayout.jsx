export default function Auth({ children, image }) {
    return (
        <div
        className="min-h-screen flex items-start justify-center pt-6 sm:pt-0"
        style={{
            backgroundColor: '#4e73df',
            backgroundImage: 'linear-gradient(180deg, #4e73df 10%, #224abe 100%)',
            backgroundSize: 'cover'
        }}
        >
            <div className='flex bg-white shadow-xl rounded-xl my-12'>
                <div className='w-full h-auto'>
                    <img src={`/storage/${image}.jpg`} alt={image} className=" rounded-s-lg" />
                </div>
                <div className="w-full p-12 sm:max-w-md mx-2 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}
