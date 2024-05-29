import diagnoseService from '../services/diagnosesService';
import express from 'express';
import { toNewEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnose!');
    });
router.post('/:id/entries', (req, res) => {
    try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = diagnoseService.addEntry(newEntry, req.params.id);
      res.json(addedEntry);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  });

export default router;