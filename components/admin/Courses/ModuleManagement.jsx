"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import {
  FaPlus,
  FaTrash,
  FaSave,
  FaBook,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaEdit,
} from "react-icons/fa";

const ModuleManagement = () => {
  // Form state for new module
  const [moduleData, setModuleData] = useState({
    title: "",
    code: "",
    instructor: "",
    department: "",
    credits: "",
    description: "",
    schedule: "",
    location: "",
  });

  // Syllabus items for the current module

  // Handle file uploads

  // Submit the entire module with syllabus

  // Syllabus items for the current module
  const [syllabusItems, setSyllabusItems] = useState([
    { week: "", description: "", courseFile: null, tdFile: null },
  ]);

  // List of all modules (would come from API in real app)
  const [modules, setModules] = useState([]);

  // Track which module is being edited
  const [editingModuleId, setEditingModuleId] = useState(null);

  // Handle module input changes
  const handleModuleChange = (e) => {
    const { name, value } = e.target;
    setModuleData({ ...moduleData, [name]: value });
  };

  // Handle syllabus item changes
  const handleSyllabusChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSyllabus = [...syllabusItems];
    updatedSyllabus[index][name] = value;
    setSyllabusItems(updatedSyllabus);
  };

  // Handle file uploads
  const handleFileUpload = (index, type, e) => {
    const file = e.target.files[0];
    const updatedSyllabus = [...syllabusItems];
    updatedSyllabus[index][type] = file;
    setSyllabusItems(updatedSyllabus);
  };

  // Add new syllabus item
  const addSyllabusItem = () => {
    setSyllabusItems([
      ...syllabusItems,
      { week: "", description: "", courseFile: null, tdFile: null },
    ]);
  };

  // Remove syllabus item
  const removeSyllabusItem = (index) => {
    const updatedSyllabus = syllabusItems.filter((_, i) => i !== index);
    setSyllabusItems(updatedSyllabus);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingModuleId(null);
    setModuleData({
      title: "",
      code: "",
      instructor: "",
      department: "",
      credits: "",
      description: "",
      schedule: "",
      location: "",
    });
    setSyllabusItems([
      { week: "", description: "", courseFile: null, tdFile: null },
    ]);
  };

  // Set up form for editing a module
  const setupEditForm = (module) => {
    setEditingModuleId(module.id);
    setModuleData({
      title: module.title,
      code: module.code,
      instructor: module.instructor,
      department: module.department,
      credits: module.credits,
      description: module.description,
      schedule: module.schedule,
      location: module.location,
    });
    setSyllabusItems(module.syllabus);
  };

  // Submit the entire module with syllabus
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for file uploads
    const formData = new FormData();

    // Append module data
    Object.entries(moduleData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append syllabus items
    syllabusItems.forEach((item, index) => {
      formData.append(`syllabus[${index}][week]`, item.week);
      formData.append(`syllabus[${index}][description]`, item.description);
      if (item.courseFile) {
        formData.append(`syllabus[${index}][courseFile]`, item.courseFile);
      }
      if (item.tdFile) {
        formData.append(`syllabus[${index}][tdFile]`, item.tdFile);
      }
    });

    try {
      // Mock success response
      const newModule = {
        ...moduleData,
        id: editingModuleId || Date.now().toString(),
        syllabus: syllabusItems,
      };

      if (editingModuleId) {
        // Update existing module
        setModules(
          modules.map((m) => (m.id === editingModuleId ? newModule : m))
        );
      } else {
        // Add new module
        setModules([...modules, newModule]);
      }

      // Reset form
      setModuleData({
        title: "",
        code: "",
        instructor: "",
        department: "",
        credits: "",
        description: "",
        schedule: "",
        location: "",
      });
      setSyllabusItems([
        { week: "", description: "", courseFile: null, tdFile: null },
      ]);
      setEditingModuleId(null);

      alert(
        editingModuleId
          ? "Module updated successfully!"
          : "Module created successfully!"
      );
    } catch (error) {
      console.error("Error saving module:", error);
      alert("Failed to save module");
    }
  };

  // Delete a module
  const deleteModule = (id) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      setModules(modules.filter((m) => m.id !== id));
      if (editingModuleId === id) {
        cancelEdit();
      }
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Module Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module Creation Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FaBook className="mr-2 text-blue-500" /> Create New Module
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Module Title*
                  </label>
                  <Input
                    name="title"
                    value={moduleData.title}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Module Code*
                  </label>
                  <Input
                    name="code"
                    value={moduleData.code}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Instructor*
                  </label>
                  <Input
                    name="instructor"
                    value={moduleData.instructor}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Department*
                  </label>
                  <Input
                    name="department"
                    value={moduleData.department}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Credits*
                  </label>
                  <Input
                    name="credits"
                    type="number"
                    value={moduleData.credits}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Schedule*
                  </label>
                  <Input
                    name="schedule"
                    value={moduleData.schedule}
                    onChange={handleModuleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Location*
                </label>
                <Input
                  name="location"
                  value={moduleData.location}
                  onChange={handleModuleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={moduleData.description}
                  onChange={handleModuleChange}
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Syllabus Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <FaCalendarAlt className="mr-2 text-green-500" /> Syllabus
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSyllabusItem}
                >
                  <FaPlus className="mr-2" /> Add Week
                </Button>
              </div>

              <div className="space-y-4">
                {syllabusItems.map((item, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">Week {index + 1}</h4>
                      {syllabusItems.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSyllabusItem(index)}
                        >
                          <FaTrash className="text-red-500" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Week Title*
                        </label>
                        <Input
                          name="week"
                          value={item.week}
                          onChange={(e) => handleSyllabusChange(index, e)}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Description*
                        </label>
                        <textarea
                          name="description"
                          value={item.description}
                          onChange={(e) => handleSyllabusChange(index, e)}
                          rows={2}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Course Materials
                          </label>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              handleFileUpload(index, "courseFile", e)
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            TD/TP Materials
                          </label>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              handleFileUpload(index, "tdFile", e)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" className="w-full">
                <FaSave className="mr-2" /> Save Module
              </Button>
            </div>
          </form>
        </div>

        {/* Existing Modules List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FaChalkboardTeacher className="mr-2 text-purple-500" /> Existing
            Modules
          </h2>

          {modules.length === 0 ? (
            <p className="text-gray-500">No modules created yet</p>
          ) : (
            <div className="space-y-4">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`border p-4 rounded-lg hover:bg-gray-50 ${
                    editingModuleId === module.id ? "bg-blue-50" : ""
                  }`}
                >
                  <h3 className="font-bold text-lg">{module.title}</h3>
                  <p className="text-sm text-gray-600">
                    {module.code} • {module.department}
                  </p>
                  <p className="text-sm mt-2">
                    {module.description.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      {module.syllabus.length} weeks
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setupEditForm(module)}
                      >
                        <FaEdit className="mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-300 hover:bg-red-50"
                        onClick={() => deleteModule(module.id)}
                      >
                        <FaTrash className="mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleManagement;
