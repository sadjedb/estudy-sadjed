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
import { useEffect, useState } from "react";
import useMarks from "@/hooks/useMarks";
import { useSession } from "next-auth/react";

const page = () => {
  const session = useSession();

  const [marks, setMarks] = useState([]);
  const {
    data: marksData,
    loading: marksLoading,
    statusCode: marksStatusCode,
  } = useMarks(session?.data?.user?.id);
  useEffect(() => {
    if (marksData?.marks && Array.isArray(marksData?.marks)) {
      setMarks(
        marksData.marks.map((item) => ({
          id: item.mark_id,
          student_module_id: item.student_module_id,
          module_id: item.module_id,
          title: item.title,
          year: item.year,
          score: item.score,
          td_score: item.td_score,
          tp_score: item.tp_score,
        }))
      );
    }
  }, [marksData]);

  const averageScore =
    marks.reduce((acc, curr) => acc + curr.score, 0) / marks.length;
  const highestScore = Math.max(...marks.map((g) => g.score));
  const totalWeightedMoy = marks.reduce((acc, grade) => {
    const moduleMoy =
      ((grade.td_score + grade.tp_score) / 2) * 0.4 + grade.score * 0.6;
    return acc + moduleMoy * (grade.coef === NaN ? grade.coef : 1);
  }, 0);
  const totalCoef = marks.reduce(
    (acc, marks) => (acc + marks.coef === NaN ? 1 : 1),
    0
  );
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
              in {marks.find((g) => g.score === highestScore)?.course}
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
              {marks.map((grade) => (
                <TableRow key={grade.mark_id}>
                  <TableCell className="font-medium">{grade.title}</TableCell>
                  <TableCell>{grade.coef || 1}</TableCell>
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
