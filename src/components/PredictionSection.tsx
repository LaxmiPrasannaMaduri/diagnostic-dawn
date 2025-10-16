import DiseaseCard from "./DiseaseCard";
import { Activity } from "lucide-react";
import heartIcon from "@/assets/heart-icon.png";
import kidneyIcon from "@/assets/kidney-icon.png";
import diabetesIcon from "@/assets/diabetes-icon.png";
import { useNavigate } from "react-router-dom";

const PredictionSection = () => {
  const navigate = useNavigate();

  const diseases = [
    {
      title: "Heart Disease",
      description: "Predict cardiovascular disease risk based on vital signs and medical history",
      icon: heartIcon,
      type: "heart",
    },
    {
      title: "Chronic Kidney Disease",
      description: "Assess kidney function and detect early signs of CKD using lab parameters",
      icon: kidneyIcon,
      type: "kidney",
    },
    {
      title: "Diabetes Risk",
      description: "Evaluate diabetes probability using glucose levels and health indicators",
      icon: diabetesIcon,
      type: "diabetes",
    },
  ];

  const handlePredictionClick = (diseaseType: string) => {
    navigate(`/predict?type=${diseaseType}`);
  };

  return (
    <section id="predictions" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Disease Predictions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered Health Screening
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select a condition to analyze your health data and receive instant AI predictions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {diseases.map((disease) => (
            <DiseaseCard
              key={disease.title}
              title={disease.title}
              description={disease.description}
              icon={disease.icon}
              onClick={() => handlePredictionClick(disease.type)}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { value: "95%", label: "Prediction Accuracy" },
            { value: "10K+", label: "Health Assessments" },
            { value: "24/7", label: "AI Availability" },
            { value: "3+", label: "Disease Models" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50"
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PredictionSection;
