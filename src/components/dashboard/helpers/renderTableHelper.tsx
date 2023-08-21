const getUniqValues = ({ values }: { values: string[] }) => {
    const columns = new Set<string>()

    values.forEach((obj: string): void => {
        Object.keys(obj).forEach((key: string): void => {
            columns.add(key)
        })
    })

    return [...columns]
}

const TableHead = ({ columns }: { columns: string[] }): JSX.Element => (
    <thead>
        <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200'>
            {columns.map((column: string) => (
                <th key={column}>{column}</th>
            ))}
        </tr>
    </thead>
)

const TableBody = ({ data }: { data: string[] }) => (
    <tbody>
        {data.map((row: string, index: number) => (
            <tr key={index}>
                {Object.values(row).map((cell: string, cellIndex: number) => (
                    <td key={`${index}-${cellIndex}`}>{cell}</td>
                ))}
            </tr>
        ))}
    </tbody>
)

const renderTable = (data: string[]) => {
    const columns = getUniqValues({ values: data })
    return (
        <div className='w-100 table-responsive table-responsive-horizontal'>
            <table className='table table-row-dashed table-row-gray-300 gy-7'>
                <TableHead columns={columns} />
                <TableBody data={data} />
            </table>
        </div>
    )
}

export { TableHead, renderTable }
