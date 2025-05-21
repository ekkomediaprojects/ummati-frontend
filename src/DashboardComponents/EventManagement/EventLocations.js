import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  MenuItem,
  Grid
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

const EventLocations = () => {
  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    stateId: "",
    description: ""
  });

  useEffect(() => {
    fetchLocations();
    fetchStates();
  }, []);

  const fetchLocations = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to access locations');
        return;
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}locations`,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        setLocations(response.data);
      } else {
        throw new Error(response?.message || 'Error fetching locations');
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast.error(error.message || 'Error fetching locations');
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to access states');
        return;
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}states`,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        setStates(response.data);
      } else {
        throw new Error(response?.message || 'Error fetching states');
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      toast.error(error.message || 'Error fetching states');
    }
  };

  const handleOpenDialog = (location = null) => {
    if (location) {
      setFormData({
        name: location.name,
        stateId: location.stateId,
        description: location.description || ""
      });
      setSelectedLocation(location);
    } else {
      setFormData({
        name: "",
        stateId: "",
        description: ""
      });
      setSelectedLocation(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLocation(null);
    setFormData({
      name: "",
      stateId: "",
      description: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to manage locations');
        return;
      }

      const url = selectedLocation
        ? `${process.env.REACT_APP_API_URL}locations/${selectedLocation.id}`
        : `${process.env.REACT_APP_API_URL}locations`;

      const response = await RequestHandler(
        url,
        selectedLocation ? 'PUT' : 'POST',
        formData,
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        toast.success(
          selectedLocation
            ? 'Location updated successfully'
            : 'Location created successfully'
        );
        fetchLocations();
        handleCloseDialog();
      } else {
        throw new Error(response?.message || 'Error saving location');
      }
    } catch (error) {
      console.error('Error saving location:', error);
      toast.error(error.message || 'Error saving location');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedLocation) return;
    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to delete location');
        return;
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}locations/${selectedLocation.id}`,
        'DELETE',
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        toast.success('Location deleted successfully');
        fetchLocations();
        setDeleteDialogOpen(false);
        setSelectedLocation(null);
      } else {
        throw new Error(response?.message || 'Error deleting location');
      }
    } catch (error) {
      console.error('Error deleting location:', error);
      toast.error(error.message || 'Error deleting location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-themeblack md:w-3/4">
      <div className="flex justify-between">
        <div className="text-base font-medium">Event Locations</div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: "50px" }}
        >
          Add Location
        </Button>
      </div>
      <hr className="mt-1" />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>
                    {states.find(state => state.id === location.stateId)?.name || 'N/A'}
                  </TableCell>
                  <TableCell>{location.description || 'N/A'}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(location)}
                      title="Edit Location"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedLocation(location);
                        setDeleteDialogOpen(true);
                      }}
                      title="Delete Location"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedLocation ? 'Edit Location' : 'Add Location'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  label="Name"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="State"
                  fullWidth
                  required
                  value={formData.stateId}
                  onChange={(e) =>
                    setFormData({ ...formData, stateId: e.target.value })
                  }
                >
                  {states.map((state) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {selectedLocation ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Location</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the location "{selectedLocation?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventLocations; 