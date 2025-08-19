import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href={'/a'}> A 로이동</Link>
    </div>
  );
}
