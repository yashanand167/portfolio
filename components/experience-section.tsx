import ExperienceIcon from "./custom-svgs/experience-icon";

export default function Experience() {
    return (
        <div className="flex items-center gap-2">
            <ExperienceIcon />
            <h2 className="text-2xl font-medium sm:text-xl lg:text-xl">
                Experience
            </h2>
        </div>
    )
}