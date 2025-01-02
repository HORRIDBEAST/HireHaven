import React, {
    createContext,
    use,
    useContext,
    useEffect,
    useState,
  } from "react";
  import axios from "axios";
  import { useRouter } from "next/navigation";
  
  const GlobalContext = createContext();

axios.defaults.baseURL = "http://localhost:7895/api";
axios.defaults.withCredentials = true;
export const GlobalContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth0user, setAuth0User] = useState(null);
    const [userProfile, setUserProfile] = useState({});
    const [loading, setLoading] = useState(false);

    const [activeEmploymentTypes, setActiveEmploymentTypes] = useState([]);

    const [jobTitle, setJobTitle] = useState("");
    const[jobDescription, setJobDescription] = useState("");
    const [jobType, setJobType] = useState("");
    const [salary, setSalary] = useState(0);
    const [location, setLocation] = useState({
        country: "",
        city: "",
        address: "",
    });
    const [salaryType, setSalaryType] = useState("Yearly");
    const [negotiable, setNegotiable] = useState(false);
    const [tags, setTags] = useState([]);
    const [skills, setSkills] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
          setLoading(true);
          try {
            const res = await axios.get("/check-auth");
           
              setIsAuthenticated(Boolean(res.data.isAuthenticated));
              setAuth0User(res.data.user);
            
            //alert(isAuthenticated);
          } catch (error) {
            console.log("Error checking auth", error);
          } finally {
            setLoading(false);
          }
        };
      
        checkAuth();
      }, []);
      

    const getUserProfile = async (id) => {
        console.log("user id is:- ",id)
        try {
            const res = await axios.get(`/user/${id}`);
            setUserProfile(res.data);
        } catch (error) {
            console.log("Error in getting user profile: " + error.message);
        }
    };

   // handle input change

   const handleTitleChange = (e) => {
    setJobTitle(e.target.value.trimStart());
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value.trimStart());
  };

  const handleTypeChange = (e) => { 
    setJobType(e.target.value.trimStart()); 
  };

  const handleSalaryChange = (e) => {   
    setSalary(e.target.value); 
  };    
  const resetJobForm = () => {
    setJobTitle("");
    setJobDescription("");
    setSalary(0);
    setActiveEmploymentTypes([]);
    setSalaryType("Yearly");
    setNegotiable(false);
    setTags([]);
    setSkills([]);
    setLocation({
      country: "",
      city: "",
      address: "",
    });
  };
 
    useEffect(() => {
        if (isAuthenticated && auth0user) {
            console.log(auth0user);
            getUserProfile(auth0user.sub);
        }
    }, [isAuthenticated, auth0user]);

    return (
        <GlobalContext.Provider
            value={{
                isAuthenticated,
                auth0user,
                userProfile,
                loading,
                getUserProfile,
                salaryType,
                setSalaryType,
                jobTitle,
                setJobTitle,
                jobDescription,
                setJobDescription,
                jobType,
                setJobType,
                resetJobForm,
                handleDescriptionChange,
                handleSalaryChange,
                handleTitleChange,
                handleTypeChange,
                activeEmploymentTypes,
                setActiveEmploymentTypes,
                salary,
                setSalary,
                location,
                setLocation,
                negotiable,
                setNegotiable,
                tags,
                setTags,
                skills,
                setSkills
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
export const useGlobalContext = () => {
    return useContext(GlobalContext);
  };