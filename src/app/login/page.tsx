'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { loginUser, selectAuthLoading, selectAuthError, selectIsAuthenticated } from '@/store/slicers/authSlicer';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthed = useAppSelector(selectIsAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if ((result as any).type?.endsWith('/fulfilled')) {
      router.push('/');
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Login</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
        <label style={{ display: 'grid', gap: '0.25rem' }}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 6 }}
          />
        </label>
        <label style={{ display: 'grid', gap: '0.25rem' }}>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '0.5rem', border: '1px solid var(--border)', borderRadius: 6 }}
          />
        </label>
        {error ? (
          <div style={{ color: 'crimson', fontSize: '0.9rem' }}>{error}</div>
        ) : null}
        <button
          type="submit"
          disabled={loading === 'pending'}
          style={{
            padding: '0.625rem 0.75rem',
            background: 'var(--primary)',
            color: 'white',
            borderRadius: 6,
            border: 0,
            cursor: 'pointer',
            opacity: loading === 'pending' ? 0.7 : 1,
          }}
        >
          {loading === 'pending' ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      {isAuthed ? (
        <p style={{ marginTop: '0.75rem', color: 'var(--muted)' }}>You are logged in.</p>
      ) : null}
    </div>
  );
}


