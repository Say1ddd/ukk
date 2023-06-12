import { Link } from "@inertiajs/react"

const SideLink = ({ active = false, className = '', children, ...props }) => {
  return (
    <div>
    <Link
    {...props}
    className={
        'flex items-center justify-start ps-4 text-sm space-x-2 font-bold leading-5 transition duration-150 py-4 ease-in-out focus:outline-none ' +
        (active
            ? 'border-indigo-400 text-white focus:border-indigo-700'
            : 'text-gray-100/65 hover:text-white focus:text-white focus:border-gray-300') +
        className
    }
>
    {children}
</Link>
</div>
  )
}

export default SideLink