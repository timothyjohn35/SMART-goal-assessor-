import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Target, BarChart2, Trophy, Clock, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const GoalStrengthTester = () => {
  const [goal, setGoal] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [showExamples, setShowExamples] = useState(false);

  const criteriaDescriptions = {
    specific: "Your goal should be clear and specific, answering the five 'W' questions: What, Why, Who, Where, and Which.",
    measurable: "Include specific criteria that measure your progress towards the accomplishment of the goal.",
    achievable: "Your goal should be realistic and attainable to be successful.",
    relevant: "Ensure that your goal matters to you and aligns with other relevant goals.",
    timeBound: "Your goal should have a clearly defined timeline, including a starting date and a target date."
  };

  const exampleGoals = [
    "Increase monthly blog traffic by 50% within 6 months by publishing 4 high-quality articles per week",
    "Run a half marathon in under 2 hours by the end of this year to improve my fitness",
    "Learn to speak conversational Spanish by practicing 30 minutes daily for the next 3 months",
    "Save $5000 for a vacation by reducing monthly expenses by 15% over the next year",
    "Improve customer satisfaction ratings from 7.5 to 9 out of 10 by the end of Q4"
  ];

  const getStrengthColor = (strength) => {
    if (strength < 40) return 'from-red-500 to-red-300';
    if (strength < 70) return 'from-yellow-500 to-yellow-300';
    return 'from-green-500 to-green-300';
  };

  const criteriaIcons = {
    specific: Target,
    measurable: BarChart2,
    achievable: Trophy,
    relevant: CheckCircle2,
    timeBound: Clock
  };

  const checkSMART = (goal) => {
    // ... (checkSMART function implementation remains the same)
  };

  useEffect(() => {
    checkSMART(goal);
  }, [goal]);

  return (
    <TooltipProvider>
      <Card className="w-[500px] bg-gradient-to-br from-blue-100 to-purple-100">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">SMART Goal Tester</CardTitle>
          <CardDescription className="text-blue-100">Create and analyze your SMART goals</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Input
            type="text"
            placeholder="Enter your goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mb-4 border-2 border-blue-300 focus:border-purple-400 rounded-md"
          />
          <div className="relative pt-1 mb-6">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div 
                style={{ width: `${strength}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${getStrengthColor(strength)}`}
              ></div>
            </div>
            <div className="mt-1 text-right">
              <strong className="text-lg">{strength}%</strong>
            </div>
          </div>
          {Object.entries(feedback).map(([criterion, { met, feedback }]) => {
            const Icon = criteriaIcons[criterion];
            return (
              <div key={criterion} className="mb-4 p-3 rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-2">
                  <Icon className={`mr-2 ${met ? 'text-green-500' : 'text-red-500'}`} size={24} />
                  <strong className="capitalize text-lg">{criterion}</strong>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="ml-2 text-gray-400" size={16} />
                    </TooltipTrigger>
                    <TooltipContent>{criteriaDescriptions[criterion]}</TooltipContent>
                  </Tooltip>
                </div>
                <p className={`text-sm ${met ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>
              </div>
            );
          })}
          <Button 
            onClick={() => setShowExamples(!showExamples)} 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {showExamples ? 'Hide' : 'Show'} Example Goals
          </Button>
          {showExamples && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
              <h3 className="font-bold mb-2">Example SMART Goals:</h3>
              <ul className="list-disc pl-5">
                {exampleGoals.map((example, index) => (
                  <li key={index} className="mb-2 text-sm cursor-pointer hover:text-blue-500" onClick={() => setGoal(example)}>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default GoalStrengthTester;
