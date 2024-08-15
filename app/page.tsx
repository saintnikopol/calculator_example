import dynamic from 'next/dynamic';

const Calculator = dynamic(() => import('../components/Calculator'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">React Calculator</h1>
      <Calculator />
    </main>
  );
}