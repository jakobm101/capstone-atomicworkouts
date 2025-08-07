import workouts from "@/lib/dbCopy/dbCopyWorkouts";

export default function handler(req, res) {
    return res.status(200).json(workouts)
}
