const TableHeader = ({ data }: { data: any[] }) => {
    const columns = new Set<string>()

    data.forEach((obj: any): void => {
        Object.keys(obj).forEach((key: string): void => {
            columns.add(key)
        })
    })
    return (
        <thead>
            <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200'>
                {[...columns].map((column: string, index: number) => (
                    <th key={`${column}-${index}`}>{column}</th>
                ))}
            </tr>
        </thead>
    )
}

const TableBody = ({ data }: { data: any[] }) => (
    <tbody>
        {data.map((row: any[], index: number) => (
            <tr key={`${data}-${index}`}>
                {Object.values(row).map((cell: string) => (
                    <td key={`${Math.random()}-${cell}-${index}`}>{cell}</td>
                ))}
            </tr>
        ))}
    </tbody>
)

export const renderTable = (data: any[]) => {
    return (
        <div className='w-100 table-responsive table-responsive-horizontal'>
            <table className='table table-row-dashed table-row-gray-300 gy-7'>
                <TableHeader data={data} />
                <TableBody data={data} />
            </table>
        </div>
    )
}
