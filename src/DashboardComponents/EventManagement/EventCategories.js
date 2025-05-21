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
  CircularProgress
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

const EventCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to access categories');
        return;
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}event-types`,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        setCategories(response.data);
      } else {
        throw new Error(response?.message || 'Error fetching categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error(error.message || 'Error fetching categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (category = null) => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || ""
      });
      setSelectedCategory(category);
    } else {
      setFormData({
        name: "",
        description: ""
      });
      setSelectedCategory(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCategory(null);
    setFormData({
      name: "",
      description: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to manage categories');
        return;
      }

      const url = selectedCategory
        ? `${process.env.REACT_APP_API_URL}event-types/${selectedCategory.id}`
        : `${process.env.REACT_APP_API_URL}event-types`;

      const response = await RequestHandler(
        url,
        selectedCategory ? 'PUT' : 'POST',
        formData,
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        toast.success(
          selectedCategory
            ? 'Category updated successfully'
            : 'Category created successfully'
        );
        fetchCategories();
        handleCloseDialog();
      } else {
        throw new Error(response?.message || 'Error saving category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(error.message || 'Error saving category');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Please log in to delete category');
        return;
      }

      const response = await RequestHandler(
        `${process.env.REACT_APP_API_URL}event-types/${selectedCategory.id}`,
        'DELETE',
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (response?.success) {
        toast.success('Category deleted successfully');
        fetchCategories();
        setDeleteDialogOpen(false);
        setSelectedCategory(null);
      } else {
        throw new Error(response?.message || 'Error deleting category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(error.message || 'Error deleting category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-themeblack md:w-3/4">
      <div className="flex justify-between">
        <div className="text-base font-medium">Event Categories</div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: "50px" }}
        >
          Add Category
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
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description || 'N/A'}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(category)}
                      title="Edit Category"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedCategory(category);
                        setDeleteDialogOpen(true);
                      }}
                      title="Delete Category"
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
          {selectedCategory ? 'Edit Category' : 'Add Category'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
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
              {selectedCategory ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the category "{selectedCategory?.name}"?
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

export default EventCategories; 