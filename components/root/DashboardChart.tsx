'use client';

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import convertFileSize from '@/utils/convertFileSize';
import calculatePercentage from '@/utils/calculatePercentage';

const chartConfig = {
  size: {
    label: 'Size',
  },
  used: {
    label: 'Used',
    color: 'white',
  },
} satisfies ChartConfig;

const DashboardChart = ({ used = 0 }: { used: number }) => {
  const chartData = [{ storage: 'used', 10: used, fill: 'white' }];

  return (
    <Card className="flex items-center rounded-2xl bg-white p-5 shadow-none border-none">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-[180px] xl:w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={Number(calculatePercentage(used)) + 90}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-blue-600 last:fill-white"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="storage" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan x={viewBox.cx} y={viewBox.cy} className="font-bold">
                          {used && calculatePercentage(used)
                            ? calculatePercentage(used).toString().replace(/^0+/, '')
                            : '0'}
                          %
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24}>
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardHeader className="flex-1 items-start px-3 py-0 sm:px-5 lg:p-3 xl:pr-5">
        <CardTitle className="font-bold md:text-center lg:text-left">Available Storage</CardTitle>
        <CardDescription className="mt-2 w-full md:text-center lg:text-left">
          {used ? convertFileSize(used) : '2GB'} / 2GB
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default DashboardChart;
