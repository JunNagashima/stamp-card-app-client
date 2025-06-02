interface StatsCardProps {
  title: string;
  value: string;
}

const StatsCard = ({ title, value }: StatsCardProps) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default StatsCard;
