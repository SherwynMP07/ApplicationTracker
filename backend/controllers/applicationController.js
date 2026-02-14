import { createApplication, getApplicationsByUser ,deleteApplication} from "../models/applicationModel.js";

export const addApplication = async (req,res)=>{
    try{
        const userId = req.user.userId;
        const newApplication = await createApplication({
            userId,
            ...req.body
        });
        res.status(201).json(newApplication);
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
    }
}

export const getApplications = async(req,res)=>{
    try{
        const userId= req.user.userId;
        const applications = await getApplicationsByUser(userId);
        res.status(200).json(applications);
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
}

export const fetchSingleApplication = async(req,res)=>{
    try{
        const app= getApplicationsByUser(req.params.id , req.user.userId);
        if (!app) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.json(app);
    }
    catch(error){
         res.status(500).json({ message: "Error fetching application" });
    }
}
export const editApplication = async (req, res) => {
  try {
    const updated = await updateApplication(
      req.params.id,
      req.user.userId,
      req.body
    );

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Error updating application" });
  }
};
export const removeApplication = async (req, res) => {
  try {
    const deleted = await deleteApplication(
      req.params.id,
      req.user.userId
    );

    if (!deleted) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting application" });
  }
};
