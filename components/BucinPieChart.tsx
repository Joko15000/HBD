
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#bfdbfe', '#a5b4fc']; // Blue-200 and Indigo-200

const BucinPieChart: React.FC = () => {
    const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

    useEffect(() => {
        // Generate a random percentage for a bit of fun
        const akuSayangPercent = Math.floor(Math.random() * 41) + 30; // Random between 30 and 70
        const sisanyaPercent = 100 - akuSayangPercent;

        const data = [
            { name: 'Aku Sayang Kamu Banget', value: akuSayangPercent },
            { name: 'Sama Aja, Cuma Beda Warna 😆', value: sisanyaPercent },
        ];
        setChartData(data);
    }, []);

    const renderLegend = (props: any) => {
        const { payload } = props;
        return (
            <ul className="flex flex-col items-center justify-center gap-2 mt-4">
                {payload.map((entry: any, index: number) => (
                    <li key={`item-${index}`} className="flex items-center text-sm md:text-base">
                        <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                        <span className="text-gray-700">{entry.value}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="w-full bg-white bg-opacity-60 p-4 sm:p-6 rounded-2xl shadow-xl text-center">
            <h3 className="text-2xl md:text-4xl font-bold text-indigo-600 mb-4">Analisis Kebucinan Aku</h3>
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            isAnimationActive={true}
                            animationDuration={1500}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => [`${value}%`, "Porsi"]}
                        />
                        <Legend content={renderLegend} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BucinPieChart;
