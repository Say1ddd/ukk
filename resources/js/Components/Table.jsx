const Table = ({ children }) => {
    return (
      <table className="my-2 border-2">
          {children}
      </table>
    )
  }
  
  const Head = ({ children }) => {
    return (
      <thead className="text-left border">
          <tr className="hover:bg-gray-200">
              {children}
          </tr>
      </thead>
    )
  }
  
  const Title = ({ value, colSpan }) => {
    return (
      <th className="border p-2" colSpan={colSpan}>{value}</th>
    )
  }
  
  const Body = ({ children }) => {
    return (
      <tbody>
          <tr className="hover:bg-gray-100">
              {children}
          </tr>
      </tbody>
    )
  }
  
  const Content = ({ value, className='', colSpan }) => {
      return (
          <td className={`border p-2` + className} colSpan={colSpan}>{value}</td>
      )
  }
  
  const Foot = ({ children }) => {
    return (
      <tfoot className="text-left">
          <tr className="hover:bg-gray-200">
              {children}
          </tr>
      </tfoot>
    )
  }
  
  Table.Title = Title;
  Table.Content = Content;
  
  Table.Head = Head;
  Table.Body = Body;
  Table.Foot = Foot;
  
  
  export default Table