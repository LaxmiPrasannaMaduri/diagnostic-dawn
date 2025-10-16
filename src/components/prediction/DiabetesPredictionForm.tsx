import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PredictionResult from "./PredictionResult";
import { Activity } from "lucide-react";

const DiabetesPredictionForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    bmi: "",
    bloodGlucose: "",
    bloodPressure: "",
    insulin: "",
    familyHistory: "",
    physicalActivity: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("predict-disease", {
        body: {
          diseaseType: "diabetes",
          parameters: formData,
        },
      });

      if (error) throw error;
      setResult(data);
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Error",
        description: "Failed to get prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return <PredictionResult result={result} diseaseType="Diabetes" onReset={() => setResult(null)} />;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          <CardTitle>Diabetes Risk Assessment</CardTitle>
        </div>
        <CardDescription>Enter your health parameters for AI-powered prediction</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bmi">BMI (Body Mass Index)</Label>
              <Input
                id="bmi"
                type="number"
                step="0.1"
                required
                value={formData.bmi}
                onChange={(e) => setFormData({ ...formData, bmi: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="bloodGlucose">Blood Glucose (mg/dL)</Label>
              <Input
                id="bloodGlucose"
                type="number"
                required
                value={formData.bloodGlucose}
                onChange={(e) => setFormData({ ...formData, bloodGlucose: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="bloodPressure">Blood Pressure (mm Hg)</Label>
              <Input
                id="bloodPressure"
                type="number"
                required
                value={formData.bloodPressure}
                onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="insulin">Insulin Level (mu U/ml)</Label>
              <Input
                id="insulin"
                type="number"
                required
                value={formData.insulin}
                onChange={(e) => setFormData({ ...formData, insulin: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="familyHistory">Family History of Diabetes</Label>
              <Select value={formData.familyHistory} onValueChange={(value) => setFormData({ ...formData, familyHistory: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="physicalActivity">Physical Activity Level</Label>
              <Select value={formData.physicalActivity} onValueChange={(value) => setFormData({ ...formData, physicalActivity: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" variant="medical" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Get Prediction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiabetesPredictionForm;
