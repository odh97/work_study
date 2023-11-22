"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useMemo, useState } from "react";

export default function ExpertDashboard() {
  const [chartData, setChartData] = useState([
    { name: "Page A", uv: 37000000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 35000000, pv: 1400, amt: 2400 },
    { name: "Page C", uv: 40000000, pv: 2000, amt: 2400 },
    { name: "Page D", uv: 30000000, pv: 1000, amt: 2400 },
    { name: "Page E", uv: 27000000, pv: 1800, amt: 2400 },
  ]);
  const chartHeightMax = useMemo(() => {
    let HeightArray = [];
    for (let data of chartData) {
      HeightArray.push(data.uv);
    }
    let dataHeightMax = Math.max(...HeightArray);
    let result = Math.ceil(dataHeightMax * 1.1);
    console.log(result);

    return result;
  }, []);
  console.log(chartHeightMax);

  return (
    <div>
      <h2>ExpertDashboard</h2>
      {/*곡선형 차트*/}
      <LineChart width={600} height={400} data={chartData} className={"pl-5"}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <XAxis dataKey="name" /> {/* x축 */}
        <YAxis /> {/* y축 */}
        <Legend /> {/* 범례 */}
        <Tooltip /> {/* 마우스 올리면 나오는 툴팁 */}
      </LineChart>

      {/* 면적 차트 */}
      <AreaChart
        width={730}
        height={250}
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
      {/* 막대형 차트 */}
      <BarChart width={730} height={250} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
