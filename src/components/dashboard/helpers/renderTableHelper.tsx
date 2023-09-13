const getUniqValues = ({ values }: { values: any[] }) => {
    const columns = new Set<string>();

    values.forEach((obj: any): void => {
        Object.keys(obj).forEach((key: string): void => {
            columns.add(key);
        });
    });

    return [...columns];
};

export const TableHead = ({ columns }: { columns: string[] }): JSX.Element => (
    <thead>
        <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200'>
            {columns.map((column: string) => (
                <th key={column}>{column}</th>
            ))}
        </tr>
    </thead>
);

const TableBody = ({ data }: { data: any[] }) => (
    <tbody>
        {data.map((row: any, index: number) => (
            <tr key={index}>
                {Object.values(row).map((cell: any, cellIndex: number) => (
                    <td key={`${index}-${cellIndex}`}>{cell}</td>
                ))}
            </tr>
        ))}
    </tbody>
);

export const renderTable = (data: any[]) => {
    const filteredData = data.map(({ status, ...rest }) => rest);
    const columns = getUniqValues({ values: filteredData });
    return (
        <div className='w-100 table-responsive table-responsive-horizontal'>
            <table className='table table-row-dashed table-row-gray-300 gy-7'>
                <TableHead columns={columns} />
                <TableBody data={filteredData} />
            </table>
        </div>
    );
};
