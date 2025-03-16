'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CompoundInterestCalculator() {
  const [formData, setFormData] = useState({
    principal: '',
    monthlyContribution: '', // Moved up
    rate: '',
    time: '',
    compoundsPerYear: '',
  });
  const [result, setResult] = useState<{
    futureValue: number;
    totalContributions: number;
    chartData: { year: number; futureValue: number; totalContributions: number }[];
  } | null>(null);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompoundsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, compoundsPerYear: value }));
  };

  const calculateCompoundInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const { principal, rate, time, compoundsPerYear, monthlyContribution } = formData;

    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100; // Convert percentage to decimal
    const t = parseFloat(time);
    const n = parseFloat(compoundsPerYear);
    const pmt = parseFloat(monthlyContribution) || 0;

    // Input validation
    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) || p < 0 || r < 0 || t < 0 || n < 0 || pmt < 0) {
      alert('Please enter valid, positive values');
      setResult(null);
      return;
    }

    // Calculate future value and chart data
    const compoundFactor = 1 + r / n;
    const totalPeriods = n * t;
    const principalGrowth = p * Math.pow(compoundFactor, totalPeriods);
    const contributionGrowth =
      pmt * ((Math.pow(compoundFactor, totalPeriods) - 1) / (r / n)) * (n / 12);
    const futureValue = principalGrowth + (pmt ? contributionGrowth : 0);
    const totalContributions = pmt * t * 12;

    // Generate chart data for each year
    const chartData = [];
    for (let year = 0; year <= t; year++) {
      const periodsSoFar = n * year;
      const fvSoFar = p * Math.pow(compoundFactor, periodsSoFar) +
        (pmt ? pmt * ((Math.pow(compoundFactor, periodsSoFar) - 1) / (r / n)) * (n / 12) : 0);
      const contribSoFar = pmt ? pmt * year * 12 : 0;
      chartData.push({
        year,
        futureValue: parseFloat(fvSoFar.toFixed(2)),
        totalContributions: parseFloat(contribSoFar.toFixed(2)),
      });
    }

    setResult({
      futureValue: parseFloat(futureValue.toFixed(2)),
      totalContributions: parseFloat(totalContributions.toFixed(2)),
      chartData,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Compound Interest Calculator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Calculate Your Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculateCompoundInterest} className="space-y-4">
            <div>
              <label htmlFor="principal" className="block text-sm font-medium">
                Principal Amount ($)
              </label>
              <Input
                id="principal"
                name="principal"
                type="number"
                step="0.01"
                value={formData.principal}
                onChange={handleChange}
                placeholder="e.g., 1000"
                required
              />
            </div>
            <div>
              <label htmlFor="monthlyContribution" className="block text-sm font-medium">
                Monthly Contribution ($)
              </label>
              <Input
                id="monthlyContribution"
                name="monthlyContribution"
                type="number"
                step="0.01"
                value={formData.monthlyContribution}
                onChange={handleChange}
                placeholder="e.g., 100 (optional)"
              />
            </div>
            <div>
              <label htmlFor="rate" className="block text-sm font-medium">
                Annual Interest Rate (%)
              </label>
              <Input
                id="rate"
                name="rate"
                type="number"
                step="0.01"
                value={formData.rate}
                onChange={handleChange}
                placeholder="e.g., 5"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium">
                Time (Years)
              </label>
              <Input
                id="time"
                name="time"
                type="number"
                step="1"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g., 10"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Compounds Per Year</label>
              <Select onValueChange={handleCompoundsChange} value={formData.compoundsPerYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Calculate</Button>
          </form>

          {result && (
            <div className="mt-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Result</h2>
                <p>
                  Future Value: <span className="font-bold">{formatter.format(result.futureValue)}</span>
                </p>
                <p>
                  Total Interest Earned:{' '}
                  <span className="font-bold">
                    {formatter.format(result.futureValue - parseFloat(formData.principal) - result.totalContributions)}
                  </span>
                </p>
                {formData.monthlyContribution && (
                  <p>
                    Total Contributions:{' '}
                    <span className="font-bold">{formatter.format(result.totalContributions)}</span>
                  </p>
                )}
              </div>

              {/* Stacked Area Chart */}
              <div className="h-[400px]">
                <h2 className="text-lg font-semibold mb-2">Growth Over Time</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => formatter.format(value as number)} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="totalContributions"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Total Contributions"
                    />
                    <Area
                      type="monotone"
                      dataKey="futureValue"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="Future Value"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}