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

const HeartPredictionForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    chestPain: "",
    restingBP: "",
    cholesterol: "",
    fastingBS: "",
    maxHR: "",
    exerciseAngina: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("predict-disease", {
        body: {
          diseaseType: "heart",
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
    return <PredictionResult result={result} diseaseType="Heart Disease" onReset={() => setResult(null)} />;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          <CardTitle>Heart Disease Risk Assessment</CardTitle>
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
              <Label htmlFor="chestPain">Chest Pain Type</Label>
              <Select value={formData.chestPain} onValueChange={(value) => setFormData({ ...formData, chestPain: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Typical Angina">Typical Angina</SelectItem>
                  <SelectItem value="Atypical Angina">Atypical Angina</SelectItem>
                  <SelectItem value="Non-Anginal">Non-Anginal</SelectItem>
                  <SelectItem value="Asymptomatic">Asymptomatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="restingBP">Resting Blood Pressure (mm Hg)</Label>
              <Input
                id="restingBP"
                type="number"
                required
                value={formData.restingBP}
                onChange={(e) => setFormData({ ...formData, restingBP: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="cholesterol">Cholesterol (mg/dl)</Label>
              <Input
                id="cholesterol"
                type="number"
                required
                value={formData.cholesterol}
                onChange={(e) => setFormData({ ...formData, cholesterol: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="fastingBS">Fasting Blood Sugar &gt; 120 mg/dl</Label>
              <Select value={formData.fastingBS} onValueChange={(value) => setFormData({ ...formData, fastingBS: value })}>
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
              <Label htmlFor="maxHR">Maximum Heart Rate</Label>
              <Input
                id="maxHR"
                type="number"
                required
                value={formData.maxHR}
                onChange={(e) => setFormData({ ...formData, maxHR: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="exerciseAngina">Exercise Induced Angina</Label>
              <Select value={formData.exerciseAngina} onValueChange={(value) => setFormData({ ...formData, exerciseAngina: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
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

export default HeartPredictionForm;
