import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PredictionResult from "./PredictionResult";

const SkinPredictionForm = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }

    setLoading(true);
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        
        const { data, error } = await supabase.functions.invoke("predict-disease", {
          body: {
            diseaseType: "skin",
            imageData: base64Image,
          },
        });

        if (error) {
          console.error("Prediction error:", error);
          toast.error(error.message || "Failed to analyze image");
          setLoading(false);
          return;
        }

        setResult(data);
        toast.success("Analysis complete!");
      };
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setImageFile(null);
    setImagePreview(null);
  };

  if (result) {
    return (
      <PredictionResult
        result={result}
        diseaseType="Skin Disease"
        onReset={handleReset}
      />
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Skin Disease Analysis</CardTitle>
        <CardDescription>
          Upload an image of the affected skin area for AI-powered dermatological assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="image">Upload Skin Image</Label>
            <div className="flex flex-col items-center justify-center w-full">
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or WEBP (MAX. 10MB)
                    </p>
                  </div>
                )}
                <input
                  id="image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> For best results, ensure the image is clear, well-lit, and focused on the affected area.
            </p>
          </div>

          <Button
            type="submit"
            variant="medical"
            className="w-full"
            disabled={loading || !imageFile}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Image...
              </>
            ) : (
              "Analyze Skin Condition"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SkinPredictionForm;
