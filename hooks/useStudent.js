import { useState, useEffect } from "react";

const useStudent = () => {
  const url = "/api/students";
  const method = "GET";
  const body = null;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const options = {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        };

        if (body && method.toUpperCase() === "POST") {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        setStatusCode(response.status);
        const result = await response.json();
        const parsedResult = Array.isArray(result.students)
          ? {
            ...result,
            students: result.students.map(student => ({
              ...student,
              // Parse any stringified arrays in student object
              wishlist: typeof student.wishlist === 'string'
                ? JSON.parse(student.wishlist)
                : student.wishlist
            }))
          }
          : result;
        setData(parsedResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addStudent = async (student) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      setStatusCode(response.status);
      const result = await response.json();
      setData((prevData) => ({
        ...prevData,
        students: [
          ...(prevData?.students || []),
          { ...student, id: result.studentId }
        ]
      }));
    } catch (error) {
      console.error('Error adding student:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeStudent = async (studentId) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId }),
      });
      setStatusCode(response.status);
      if (response.ok) {
        setData((prevData) =>
          (prevData || []).filter((item) => item.id !== studentId)
        );
      }
    } catch (error) {
      console.error("Error removing student:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, statusCode, addStudent, removeStudent };
};

export default useStudent;
