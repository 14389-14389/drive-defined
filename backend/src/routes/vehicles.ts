import express, { Request, Response } from 'express';
import { Vehicle } from '../models/Vehicle.js';

const router = express.Router();

// GET all available vehicles
router.get('/', async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find({ status: 'available' })
      .sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// GET featured vehicles
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find({ 
      isFeatured: true, 
      status: 'available' 
    })
    .limit(6)
    .sort({ createdAt: -1 });
    
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching featured vehicles:', error);
    res.status(500).json({ error: 'Failed to fetch featured vehicles' });
  }
});

// GET single vehicle by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    
    res.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
});

// POST create new vehicle
router.post('/', async (req: Request, res: Response) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(400).json({ error: 'Failed to create vehicle' });
  }
});

// PUT update vehicle
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    
    res.json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(400).json({ error: 'Failed to update vehicle' });
  }
});

// DELETE vehicle
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
});

export default router;
