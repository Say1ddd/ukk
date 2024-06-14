import { Link } from "@inertiajs/react"

const SmallCard = ({ children, className, href }) => {
  return (
    <Link href={href} className={className}>
      <div className={`border-2 p-2 bg-white border-transparent rounded-xl border-l-4 border-l-blue-500 flex justify-between items-center`}>
          {children}
      </div>
    </Link>
  )
}

const SmallCardContent = ({ children, className='', icon }) => {
  return (
    <>
    <div className={`flex flex-col p-4` + className}>
        {children}
    </div>
    {icon && (
        icon
    )}
    </>
  )
}

SmallCard.Content = SmallCardContent

export default SmallCard