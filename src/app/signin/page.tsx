'use client';

import { loginAction } from '@/features/login/action';
import { redirect } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';

export default function Page() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(loginAction, null);

    useEffect(() => {
        if (state?.status) {
            redirect('/');
        }
    }, [state?.status]);

    const onSumbit = () => {
        formRef?.current?.requestSubmit();
    };
    return (
        <div>
            <form ref={formRef} action={formAction}>
                <label htmlFor="loginId">ID : </label>
                <input required type="text" name="loginId" />

                <label htmlFor="loginPw">PW : </label>
                <input required type="password" name="loginPw" />

                {isPending ? <div>...</div> : <div onClick={onSumbit}>버튼</div>}
                {!state?.status && (
                    <div style={{ color: 'red' }}>
                        {state?.error} {state?.el}
                    </div>
                )}
            </form>
        </div>
    );
}
