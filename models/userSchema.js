import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        fullName: { type: String, required: true },
        bio: { type: String },
        avatar: { type: String },

        // Portfolio specific
        title: { type: String }, // e.g. "Full Stack Developer"
        skills: [{ type: String }], // e.g. ["React", "Node.js"]
        externalLinks: [
            {
                platform: { type: String }, // "LinkedIn", "GitHub", "Website"
                url: { type: String },
                icon: { type: String } // Optional icon identifier
            }
        ],

        // Resume Data
        experience: [{
            role: { type: String },
            company: { type: String },
            duration: { type: String },
            description: { type: String },
            logo: { type: String }
        }],
        education: [{
            institution: { type: String },
            degree: { type: String },
            duration: { type: String },
            grade: { type: String },
            logo: { type: String }
        }],

        // Detailed Skills
        skillsCategory: {
            languages: [String],
            frontend: [String],
            backend: [String],
            deployment: [String],
            tools: [String]
        },
        competitiveProgramming: { type: String },

        // Lists
        miniProjects: [String],
        achievements: [String],

        // Stats (Cached or manually set)
        projectsCount: { type: Number, default: 0 },
        experienceYears: { type: Number, default: 0 },
        certificationsCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Prevent model caching issues in Next.js development
if (models.User) {
    delete models.User;
}

const User = model("User", UserSchema);
export default User;
