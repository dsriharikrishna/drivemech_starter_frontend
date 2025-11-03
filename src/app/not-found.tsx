import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center',
      gap: '0.75rem',
      minHeight: '60vh'
    }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>404</h1>
        <p style={{ color: 'var(--muted)', margin: '0.25rem 0 1rem' }}>
          The page you’re looking for doesn’t exist.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              padding: '0.5rem 0.75rem',
              background: 'var(--primary)',
              color: 'white',
              borderRadius: 6,
              textDecoration: 'none'
            }}
          >
            Go home
          </Link>
          <Link
            href="/login"
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
              borderRadius: 6,
              textDecoration: 'none'
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}


