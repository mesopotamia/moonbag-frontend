import { createClient } from '@supabase/supabase-js';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useEffect, useState} from "react";

/*const supabase = createClient(
    'https://xlqsbcdulksxihgxxyil.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhscXNiY2R1bGtzeGloZ3h4eWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE0MDU2MTIsImV4cCI6MTk4Njk4MTYxMn0.vzr4xoy0Fg374I0C6QzWWQ0lM4J2Qk90vUMZkUt0eY4'
)*/
export const LoginPage = () => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()
    const [data, setData] = useState()

    useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('test').select('*')
            setData(data)
        }
        // Only run query once user is logged in.
        if (user) loadData()
    }, [user])

    if (!user)
        return (
            <Auth
                redirectTo="http://localhost:3000/"
                appearance={{ theme: ThemeSupa }}
                supabaseClient={supabaseClient}
                providers={['google', 'github']}
                socialLayout="horizontal"
            />
        )

    return (
        <>
            <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
            <p>user:</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <p>client-side data fetching with RLS</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    )
}
