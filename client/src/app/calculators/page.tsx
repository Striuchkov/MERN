import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Calculators() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Calculators</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Compound Interest Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Calculate the growth of your investment with compound interest.</p>
            <Link href="/calculators/compound-interest" className="text-blue-500 hover:underline">
              Go to Calculator
            </Link>
          </CardContent>
        </Card>
        {/* Add more calculators here in the future */}
      </div>
    </div>
  );
}