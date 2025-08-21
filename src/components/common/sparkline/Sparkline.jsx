import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from "recharts";

const Sparkline = ({
  data,
  color = "hsl(3, 68%, 58%)",
  fill = "none",
  strokeWidth = 1.5,
  granularValue = 48,
  isToolTipUsing = false,
}) => {
  const step = Math.max(1, Math.floor(data.length / granularValue));
  const sampled = data.filter((_, i) => i % step === 0);
  const formattedData = sampled.map((price, index) => ({
    index,
    price,
  }));

  // height={parseInt(height)}
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={formattedData}>
        <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          fill={fill}
          strokeWidth={strokeWidth}
        />
        {isToolTipUsing === true && (
          <Tooltip
            contentStyle={{
              fontSize: "12px",
              borderRadius: "8px",
              background: "#1a1a20",
            }}
            formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Sparkline;
