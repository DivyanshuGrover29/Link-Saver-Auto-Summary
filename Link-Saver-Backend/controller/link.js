import { Link } from "../models/link.js";
import axios from "axios";

export const postLink = async(req, res) => {
  try {

    if (!req.user || !req.user._id) {
      return res.status(401).json({ 
        message: "User not authenticated", 
        success: false 
      });
    }

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ 
        message: "URL is required", 
        success: false 
      });
    }

    let summary = 'Summary not available';
    try {
      let processedUrl = url.trim();
      
      if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
        processedUrl = `https://${processedUrl}`;
      }
      
      try {
        new URL(processedUrl);
      } catch (e) {
        throw new Error('Invalid URL format');
      }
    
      const urlObj = new URL(processedUrl);
      const encodedPath = encodeURIComponent(urlObj.hostname + urlObj.pathname);
      
      const jinaUrl = `https://r.jina.ai/${urlObj.protocol}//${encodedPath}`;
      
      const response = await axios.get(jinaUrl, {
        headers: {
          'Accept': 'text/plain',
          'User-Agent': 'YourApp/1.0'
        },
      });
      
      summary = response.data;
    } catch (err) {
      console.error('Error fetching summary:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        url: ur
      });
      summary = 'Could not fetch summary';
    }

    const link = new Link({
      userId: req.user._id, 
      url,
      title: url,
      favicon: '',
      summary
    });
    
    const savedLink = await link.save();
    res.json(savedLink);
  } catch(error) {
    console.log(error);
    return res.status(500).json({ 
      message: "Internal server error", 
      success: false 
    });
  }
}
export const getLinks = async (req, res) => {
    try {
        const links = await Link.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(links);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    };

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, favicon } = req.body;

    if (!id || (!title && !favicon)) {
      return res.status(400).json({ 
        message: "ID and at least one field to update are required", 
        success: false 
      });
    }

    const updatedLink = await Link.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { $set: { title, favicon } },
      { new: true }
    );

    if (!updatedLink) {
      return res.status(404).json({ 
        message: "Link not found", 
        success: false 
      });
    }

    res.json(updatedLink);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ 
      message: "Internal server error", 
      success: false 
    });
  }
};

export const deleteLink = async (req, res) => {
    try{
       const { id} = req.params;
       const deletedLink = await Link.findOneAndDelete({ 
        _id: id, 
        userId: req.user._id 
      });
  
      if (!deletedLink) {
        return res.status(404).json({ 
          message: "Link not found or unauthorized", 
          success: false 
        });
      }

       res.json({ message: "Deleted Successfully", success: true });
     } catch (err) {
       res.status(400).json({ success:false, error: err.message });
     }
   };