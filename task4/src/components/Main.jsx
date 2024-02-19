import { useState, useEffect } from 'react';
import Table from './Table';

import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Main({ supabase, session }) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const block = () => {
        setLoading(true);
        // ajax request after empty completing
        supabase.rpc('block_users', { user_ids: selectedRowKeys }).then((res) => {
            let { data, error } = res;
            if (error) console.error('block', error, data);
            getUsers();
            checkSignOut(selectedRowKeys);
            setSelectedRowKeys([]);
            setLoading(false);
        });
    };

    const unblock = () => {
        setLoading(true);
        // ajax request after empty completing
        supabase.rpc('unblock_users', { user_ids: selectedRowKeys }).then((res) => {
            let { data, error } = res;
            if (error) console.error('unblock', error, data);
            getUsers();
            setSelectedRowKeys([]);
            setLoading(false);
        });
    };

    const remove = () => {
        setLoading(true);
        // ajax request after empty completing
        supabase.rpc('delete_users', { user_ids: selectedRowKeys }).then((res) => {
            let { data, error } = res;
            if (error) console.error('delete', error, data);
            getUsers();
            checkSignOut(selectedRowKeys);
            setSelectedRowKeys([]);
            setLoading(false);
        });
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const hasSelected = selectedRowKeys.length > 0;

    function getUsers() {
        console.log('get users..');
        supabase.rpc('get_users').then((res) => {
            let { data, error } = res;

            if (error) {
                console.error('get_users', error, data);
                return;
            }

            const user_data = data.map((user) => {
                const {
                    id,
                    id: key,
                    last_sign_in_at,
                    banned_until,
                    email: eMail,
                    raw_user_meta_data: { name },
                } = user;

                const lastLogin = new Date(last_sign_in_at).toLocaleString();
                const status = banned_until === null ? 'Active' : 'Blocked';

                return { id, key, lastLogin, eMail, status, name };
            });

            setUsers(user_data);
        });
    }

    function checkSignOut(user_ids) {
        if (user_ids.some((item) => item === session.user.id)) {
            supabase.auth.signOut();
            console.log('Sign Out..');
        }
    }

    return (
        <>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <Stack spacing={2} direction="row">
                    <LoadingButton variant="contained" onClick={block} disabled={!hasSelected} loading={loading} startIcon={<LockIcon />}>
                        Block
                    </LoadingButton>
                    <LoadingButton variant="contained" onClick={unblock} disabled={!hasSelected} loading={loading} startIcon={<LockOpenIcon />}>
                        Unblock
                    </LoadingButton>
                    <LoadingButton variant="contained" color="error" onClick={remove} disabled={!hasSelected} loading={loading} startIcon={<DeleteIcon />} >
                        Delete
                    </LoadingButton>
                </Stack>
            </div>

            <Table data={users} onSelectChange={onSelectChange} rowSelectionModel={selectedRowKeys} />
        </>
    );
}
