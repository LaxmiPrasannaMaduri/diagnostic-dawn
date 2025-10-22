import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeartPredictionForm from "@/components/prediction/HeartPredictionForm";
import KidneyPredictionForm from "@/components/prediction/KidneyPredictionForm";
import DiabetesPredictionForm from "@/components/prediction/DiabetesPredictionForm";
import SkinPredictionForm from "@/components/prediction/SkinPredictionForm";

const Predict = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const diseaseType = searchParams.get("type");

  const renderForm = () => {
    switch (diseaseType) {
      case "heart":
        return <HeartPredictionForm />;
      case "kidney":
        return <KidneyPredictionForm />;
      case "diabetes":
        return <DiabetesPredictionForm />;
      case "skin":
        return <SkinPredictionForm />;
      default:
        return <div className="text-center text-muted-foreground">Invalid disease type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        {renderForm()}
      </div>
    </div>
  );
};

export default Predict;
