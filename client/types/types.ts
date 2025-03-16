interface Job {
    _id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    salaryType: "Yearly" | "Monthly" | "Weekly" | "Hourly";
    negotiable: boolean;
    jobType: string[];
    tags: string[];
    likes: string[];
    skills: string[];
    applicants: string[];
    createdBy: {
      _id: string;
      profilePicture: string;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  }

   interface Interview {
    name: string; // Name of the user or interviewee
    mockId: string; // Unique ID for the mock interview
    email: string; // Email address of the user
    jobdescription: string; // Job description for the mock interview
    jobtitle: string; // Job title for the mock interview
    json_mock_response: string; // JSON string containing the mock AI's response
    jobexperience: string; // Experience level for the job (e.g., "2 years")
  }
  
   interface Question {
    question: string;
    answer: string;
  }
   interface QuestionSectionsProps {
    interviewData: Interview;
    mockQuestions: Question[];
    activeQIndex: number;
  }
  
  interface Review {
    _id: string;
    job: {
      title: string;
    };
    review: string;
    role: string;
    name: string;
    rating: number;
    user: {
      name: string;
      profilePicture: string;
      _id: string;
      role: string;
    }
  }
  export type { Job,Review ,Interview,Question,QuestionSectionsProps };