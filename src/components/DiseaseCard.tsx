import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface DiseaseCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}

const DiseaseCard = ({ title, description, icon, onClick }: DiseaseCardProps) => {
  return (
    <Card className="group hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-2 border-2 border-border/50 hover:border-primary/50 bg-gradient-to-br from-card to-secondary/20">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <img src={icon} alt={title} className="w-12 h-12 object-contain" />
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button 
          variant="medical" 
          className="w-full"
          onClick={onClick}
        >
          Start Prediction
        </Button>
      </CardContent>
    </Card>
  );
};

export default DiseaseCard;
