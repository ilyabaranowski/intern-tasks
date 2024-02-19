import Main from './components/Main';
import './App.css';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function App() {
    const [session, setSession] = useState(null);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    console.log('session',);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode]
    );

    useEffect(() => {
        // Получим сессию из локального хранилища
        supabase.auth.getSession().then(({ data: { session } }) => {

            if (session)
                // Перепроверим данные на сервере
                supabase.auth.refreshSession().then((res) => {
                    const { data, error } = res
                    console.log('refr', data, error)
                })

            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <div className="container" style={{ padding: '50px 0 100px 0', display:'flex', flexDirection:'column', gap:'12px' }}>
            {!session ? (
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
            ) : (
                <>
                    <ThemeProvider theme={theme}>
                        <div>
                            <div>{session.user.email}!</div>
                            <button onClick={() => supabase.auth.signOut()}>Sign out</button>
                        </div>
                        <Main key={session.user.id} supabase={supabase} session={session} />
                    </ThemeProvider>
                </>
            )}
        </div>
    );
}
