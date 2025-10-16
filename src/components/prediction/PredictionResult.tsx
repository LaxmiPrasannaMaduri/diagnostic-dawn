import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface PredictionResultProps {
  result: {
    riskPercentage: number;
    riskLevel: string;
    keyFactors: string[];
    recommendations: string[];
  };
  diseaseType: string;
  onReset: () => void;
}

const PredictionResult = ({ result, diseaseType, onReset }: PredictionResultProps) => {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return <CheckCircle className="w-16 h-16 text-green-600" />;
      case "medium":
        return <AlertCircle className="w-16 h-16 text-yellow-600" />;
      case "high":
        return <XCircle className="w-16 h-16 text-red-600" />;
      default:
        return <AlertCircle className="w-16 h-16 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getRiskIcon(result.riskLevel)}
          </div>
          <CardTitle className="text-3xl">{diseaseType} Risk Assessment</CardTitle>
          <CardDescription>AI-powered analysis based on your health parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-background rounded-lg">
            <div className={`text-6xl font-bold ${getRiskColor(result.riskLevel)} mb-2`}>
              {result.riskPercentage}%
            </div>
            <Badge variant={result.riskLevel.toLowerCase() === "low" ? "default" : "destructive"} className="text-lg px-4 py-1">
              {result.riskLevel} Risk
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Key Risk Factors</h3>
            <ul className="space-y-2">
              {result.keyFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Disclaimer:</strong> This is an AI-powered assessment for informational purposes only. 
              Please consult with a qualified healthcare professional for proper medical diagnosis and treatment.
            </p>
          </div>

          <Button onClick={onReset} variant="medical" className="w-full">
            Make Another Prediction
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResult;
