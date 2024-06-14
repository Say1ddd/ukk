const Card = ({ title, children, className = '' }) => {
    return (
      <div className={`flex flex-col text-gray-500 rounded-lg border-2 shadow-xl overflow-hidden bg-white` + className}>
          <div className="p-4 text-2xl bg-gray-100/75 text-blue-600 outline outline-1 outline-gray-200">{title}</div>
          {children}
      </div>
    )
  }
  
  const CardContent = ({ children, content, className = '' }) => {
    return (
      <>
        <div className={`flex flex-col p-4` + className}>
          <div className="flex items-center justify-between">
            {content}
          </div>
          {children}
        </div>
      </>
    )
  }
  
  Card.Content = CardContent
  
  export default Card