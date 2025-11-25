const Link = require('../models/Link');
const { nanoid } = require('nanoid');
const validator = require('validator');

const createLink = async (req, res) => {
  try {
    const { url, code } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!validator.isURL(url)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    let linkCode = code;
    if (code) {
      if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
        return res.status(400).json({ error: 'Code must be 6-8 alphanumeric characters' });
      }
      
      const existingLink = await Link.findOne({ code });
      if (existingLink) {
        return res.status(409).json({ error: 'Code already exists' });
      }
    } else {
      do {
        linkCode = nanoid(6);
      } while (await Link.findOne({ code: linkCode }));
    }

    const newLink = new Link({
      code: linkCode,
      url: url.startsWith('http') ? url : `https://${url}`,
      clicks: 0,
      lastClicked: null
    });

    await newLink.save();

    res.status(201).json({
      code: newLink.code,
      url: newLink.url,
      clicks: newLink.clicks,
      lastClicked: newLink.lastClicked,
      createdAt: newLink.createdAt
    });
  } catch (error) {
    console.error('Create link error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find({}).sort({ createdAt: -1 });
    
    res.json(links.map(link => ({
      code: link.code,
      url: link.url,
      clicks: link.clicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt
    })));
  } catch (error) {
    console.error('Get all links error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLinkStats = async (req, res) => {
  try {
    const { code } = req.params;
    
    const link = await Link.findOne({ code });
    if (!link) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json({
      code: link.code,
      url: link.url,
      clicks: link.clicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt
    });
  } catch (error) {
    console.error('Get link stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteLink = async (req, res) => {
  try {
    const { code } = req.params;
    
    const link = await Link.findOneAndDelete({ code });
    if (!link) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error('Delete link error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const redirectToTarget = async (req, res) => {
  try {
    const { code } = req.params;
    
    const link = await Link.findOne({ code });
    if (!link) {
      return res.status(404).json({ error: 'Not found' });
    }

    link.clicks += 1;
    link.lastClicked = new Date();
    await link.save();

    res.redirect(302, link.url);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  redirectToTarget
};