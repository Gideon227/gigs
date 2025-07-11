
export interface JobProps{
    id: string;
    title: string;
    description: string;
    location: string;
    country: string;
    state: string;
    city: string;
    jobType: string;
    salary: string;
    skills: string[];
    experienceLevel: string;
    currency: string;
    applicationUrl: string;
    benefits?: string;
    approvaalStatus?: string;
    brokenLink: boolean;
    jobStatus: string;
    responsibilities: string[];
    workSettings: string;
    roleCategory: string;
    qualifications: string[];
    companyLogo?: string;
    companyName?: string;
    ipBlocked: boolean;
    createdAt: string;
    updatedAt: string;
}

// export const Jobs: JobProps[] = [
//     {
//         id: "0",
//         image:'/about-illustration-1.svg',
//         title: 'Senior PHP Developer',
//         description: "We are seeking a dynamic and innovative Marketing Specialist to join our team. The ideal candidate will be responsible for developing and executing marketing strategies that drive brand...",
//         location: "Indianapolis, IN",
//         companyName: "IBM",
//         jobType: "Gig-work",
//         datePosted: "Posted 5 mins ago",
//         salary: "$75K - $100K",
//         tags: ["UI", "UX", "Javascript", "Laravel", "Html", "CSS"],
//         shareLink: "http://localhost:3000/browse-jobs"
//     },
//     {
//         id: 1,
//         image:'/about-illustration-2.svg',
//         title: 'Senior UI/UX Designer',
//         description: "Join our creative team as a UI/UX Designer! We’re looking for someone who is passionate about crafting intuitive and engaging user experiences. In this role, you will collaborate with...",
//         location: "Austin, TX",
//         companyName: "Paypal, US",
//         jobType: "Full-time",
//         datePosted: "Posted 8 mins ago",
//         salary: "$60K - $90K",
//         tags: ["UI", "UX", "Framer", "Webflow", "Advanced Prototyping", "CSS"],
//         shareLink: "http://localhost:3000/browse-jobs"
//     },
// ]