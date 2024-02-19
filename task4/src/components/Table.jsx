import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        headerName: 'Name',
        field: 'name',
        width: 150,
    },
    {
        headerName: 'e-mail',
        field: 'eMail',
        width: 200,
    },
    {
        headerName: 'Last login',
        field: 'lastLogin',
        width: 200,
    },
    {
        headerName: 'Status',
        field: 'status',
        width: 100,
    },
];

export default function AntdTable({ onSelectChange, data, rowSelectionModel }) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                checkboxSelection
                onRowSelectionModelChange={onSelectChange}
                rowSelectionModel={rowSelectionModel}
            />
        </div>
    );
}
