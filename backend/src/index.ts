import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import facultyRoutes from "./routes/facultyRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import classroomRoutes from "./routes/classroomRoutes";
import labRoutes from "./routes/labRoutes";
import timetableRoutes from "./routes/timetableRoutes";
import timetableSlotsRouter from "./routes/timetableSlots";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/faculty", facultyRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/timetable-slots", timetableSlotsRouter);

// Serve frontend static files in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));
  
  // Handle React routing - return index.html for all non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
