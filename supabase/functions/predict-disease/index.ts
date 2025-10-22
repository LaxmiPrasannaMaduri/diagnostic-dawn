import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { diseaseType, parameters, imageData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let messages: any[] = [];

    switch (diseaseType) {
      case "heart":
        systemPrompt = "You are a medical AI specialized in cardiovascular disease risk assessment. Analyze the provided health parameters and provide a risk assessment with percentage, risk level (Low/Medium/High), key factors, and recommendations.";
        messages = [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze heart disease risk based on these parameters: Age: ${parameters.age}, Gender: ${parameters.gender}, Chest Pain Type: ${parameters.chestPain}, Resting BP: ${parameters.restingBP}, Cholesterol: ${parameters.cholesterol}, Fasting Blood Sugar: ${parameters.fastingBS}, Max Heart Rate: ${parameters.maxHR}, Exercise Angina: ${parameters.exerciseAngina}. Provide a JSON response with: riskPercentage (number), riskLevel (Low/Medium/High), keyFactors (array of strings), recommendations (array of strings).` }
        ];
        break;
      
      case "kidney":
        systemPrompt = "You are a medical AI specialized in chronic kidney disease assessment. Analyze the provided health parameters and provide a risk assessment with percentage, risk level (Low/Medium/High), key factors, and recommendations.";
        messages = [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze CKD risk based on these parameters: Age: ${parameters.age}, Blood Pressure: ${parameters.bp}, Specific Gravity: ${parameters.sg}, Albumin: ${parameters.albumin}, Sugar: ${parameters.sugar}, Red Blood Cells: ${parameters.rbc}, Serum Creatinine: ${parameters.sc}, Sodium: ${parameters.sod}, Potassium: ${parameters.pot}, Hemoglobin: ${parameters.hemo}, White Blood Cell Count: ${parameters.wbcc}, Red Blood Cell Count: ${parameters.rbcc}. Provide a JSON response with: riskPercentage (number), riskLevel (Low/Medium/High), keyFactors (array of strings), recommendations (array of strings).` }
        ];
        break;
      
      case "diabetes":
        systemPrompt = "You are a medical AI specialized in diabetes risk assessment. Analyze the provided health parameters and provide a risk assessment with percentage, risk level (Low/Medium/High), key factors, and recommendations.";
        messages = [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze diabetes risk based on these parameters: Age: ${parameters.age}, Gender: ${parameters.gender}, BMI: ${parameters.bmi}, Blood Glucose: ${parameters.bloodGlucose}, Blood Pressure: ${parameters.bloodPressure}, Insulin: ${parameters.insulin}, Family History: ${parameters.familyHistory}, Physical Activity: ${parameters.physicalActivity}. Provide a JSON response with: riskPercentage (number), riskLevel (Low/Medium/High), keyFactors (array of strings), recommendations (array of strings).` }
        ];
        break;
      
      case "skin":
        if (!imageData) throw new Error("Image data is required for skin disease prediction");
        systemPrompt = "You are a medical AI specialized in dermatology and skin disease diagnosis. Analyze the provided skin image and provide a detailed assessment with diagnosis, confidence level, key observations, and recommendations.";
        messages = [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: [
              {
                type: "text",
                text: "Analyze this skin image and identify potential skin conditions or diseases. Provide a JSON response with: riskPercentage (confidence level as number), riskLevel (Low/Medium/High based on severity), keyFactors (array of visible symptoms/observations), recommendations (array of advice and next steps)."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ];
        break;
      
      default:
        throw new Error("Invalid disease type");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: messages,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the JSON response from AI
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }
    
    const prediction = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Disease prediction error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
