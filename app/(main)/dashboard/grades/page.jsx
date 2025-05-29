"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChartLine } from "react-icons/fa";
import Link from "next/link";

const page = () => {
  const grades = [
    {
      id: 1,
      course: "Machine Learning",
      coef: 1,
      score: 18,
      td_score: 17,
      tp_score: 19,
    },
    {
      id: 2,
      course: "Database Systems",
      coef: 2,
      score: 17,
      td_score: 16,
      tp_score: 18,
    },
    {
      id: 3,
      course: "Algorithms",
      coef: 3,
      score: 16,
      td_score: 15,
      tp_score: 17,
    },
    {
      id: 4,
      course: "Computer Networks",
      coef: 3,
      score: 14,
      td_score: 15,
      tp_score: 13,
    },
  ];

  const averageScore =
    grades.reduce((acc, curr) => acc + curr.score, 0) / grades.length;
  const highestScore = Math.max(...grades.map((g) => g.score));
  const totalWeightedMoy = grades.reduce((acc, grade) => {
    const moduleMoy =
      ((grade.td_score + grade.tp_score) / 2) * 0.4 + grade.score * 0.6;
    return acc + moduleMoy * grade.coef;
  }, 0);
  const totalCoef = grades.reduce((acc, grade) => acc + grade.coef, 0);
  const moyenneDeSemester = totalWeightedMoy / totalCoef;
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <FaChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Academic Transcript</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">/ 20 points</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Highest Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {highestScore}
            </div>
            <p className="text-xs text-muted-foreground">
              in {grades.find((g) => g.score === highestScore)?.course}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Moyenne De Semester
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">
              {moyenneDeSemester.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FaChartLine className="mr-2 h-5 w-5 text-muted-foreground" />
            Course Grades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Course</TableHead>
                <TableHead>Coeficient</TableHead>
                <TableHead>TD</TableHead>
                <TableHead>TP</TableHead>
                <TableHead>Final</TableHead>
                <TableHead>Module Moyene</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.course}</TableCell>
                  <TableCell>{grade.coef}</TableCell>
                  <TableCell>
                    <span className="font-medium">{grade.td_score}</span>
                    <span className="text-xs text-muted-foreground">/20</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{grade.tp_score}</span>
                    <span className="text-xs text-muted-foreground">/20</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{grade.score}</span>
                    <span className="text-xs text-muted-foreground">/20</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {((grade.td_score + grade.tp_score) / 2) * 0.4 +
                        grade.score * 0.6}
                    </span>
                    <span className="text-xs text-muted-foreground">/20</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
