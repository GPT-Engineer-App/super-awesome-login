import { Box, Text, VStack } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExerciseMinutesCard = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Exercise Minutes",
        data: [30, 45, 60, 50, 70, 80, 90],
        borderColor: "#3182ce",
        backgroundColor: "rgba(49, 130, 206, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.raw;
            if (context.dataIndex === 6) {
              return `${label}: Today - ${value} mins`;
            }
            const average = context.dataset.data.reduce((a, b) => a + b, 0) / context.dataset.data.length;
            return `${label}: ${value} mins (Avg: ${average.toFixed(2)} mins)`;
          },
        },
      },
    },
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="sm">
      <VStack align="start">
        <Text fontSize="lg" fontWeight="bold">Exercise Minutes</Text>
        <Text>Your exercise minutes are ahead of where you normally are.</Text>
        <Line data={data} options={options} />
      </VStack>
    </Box>
  );
};

export default ExerciseMinutesCard;