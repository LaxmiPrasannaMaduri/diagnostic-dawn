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

const KidneyPredictionForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    age: "",
    bp: "",
    sg: "",
    albumin: "",
    sugar: "",
    rbc: "",
    sc: "",
    sod: "",
    pot: "",
    hemo: "",
    wbcc: "",
    rbcc: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("predict-disease", {
        body: {
          diseaseType: "kidney",
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
    return <PredictionResult result={result} diseaseType="Chronic Kidney Disease" onReset={() => setResult(null)} />;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          <CardTitle>Chronic Kidney Disease Risk Assessment</CardTitle>
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
              <Label htmlFor="bp">Blood Pressure (mm/Hg)</Label>
              <Input
                id="bp"
                type="number"
                required
                value={formData.bp}
                onChange={(e) => setFormData({ ...formData, bp: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="sg">Specific Gravity</Label>
              <Input
                id="sg"
                type="number"
                step="0.001"
                required
                value={formData.sg}
                onChange={(e) => setFormData({ ...formData, sg: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="albumin">Albumin</Label>
              <Input
                id="albumin"
                type="number"
                required
                value={formData.albumin}
                onChange={(e) => setFormData({ ...formData, albumin: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="sugar">Sugar</Label>
              <Input
                id="sugar"
                type="number"
                required
                value={formData.sugar}
                onChange={(e) => setFormData({ ...formData, sugar: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="rbc">Red Blood Cells</Label>
              <Select value={formData.rbc} onValueChange={(value) => setFormData({ ...formData, rbc: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Abnormal">Abnormal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sc">Serum Creatinine (mg/dl)</Label>
              <Input
                id="sc"
                type="number"
                step="0.1"
                required
                value={formData.sc}
                onChange={(e) => setFormData({ ...formData, sc: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="sod">Sodium (mEq/L)</Label>
              <Input
                id="sod"
                type="number"
                required
                value={formData.sod}
                onChange={(e) => setFormData({ ...formData, sod: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="pot">Potassium (mEq/L)</Label>
              <Input
                id="pot"
                type="number"
                step="0.1"
                required
                value={formData.pot}
                onChange={(e) => setFormData({ ...formData, pot: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="hemo">Hemoglobin (gms)</Label>
              <Input
                id="hemo"
                type="number"
                step="0.1"
                required
                value={formData.hemo}
                onChange={(e) => setFormData({ ...formData, hemo: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="wbcc">White Blood Cell Count (cells/cumm)</Label>
              <Input
                id="wbcc"
                type="number"
                required
                value={formData.wbcc}
                onChange={(e) => setFormData({ ...formData, wbcc: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="rbcc">Red Blood Cell Count (millions/cmm)</Label>
              <Input
                id="rbcc"
                type="number"
                step="0.1"
                required
                value={formData.rbcc}
                onChange={(e) => setFormData({ ...formData, rbcc: e.target.value })}
              />
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

export default KidneyPredictionForm;
