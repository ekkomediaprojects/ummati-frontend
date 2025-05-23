"use client";
// import { searchUsers } from "@/components/Helper/helperFunctions";
import { useEffect, useState } from "react";
import UserList from "./UserList";
import { Button, CircularProgress, Alert } from "@mui/material";
// import { exportDataAsCSV } from "@/components/Helper/csvExportFuctions";
import RequestHandler from "../../utils/RequestHandler";
import toast from "react-hot-toast";

// Use the environment variable with a fallback
const API_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, '') || 'https://api.ummaticommunity.com';

console.log('=== UserListSection Initialization ===');
console.log('1. Environment Variables:', {
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  API_URL: API_URL
});

const UserListSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchUsers = async (page = 1, search = "") => {
    console.log('=== fetchUsers Debug ===');
    console.log('1. Function called with:', { page, search });
    
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem('userToken');
      
      console.log('2. Token check:', {
        hasToken: !!token,
        tokenLength: token?.length
      });
      
      if (!token) {
        throw new Error('Please log in to view users');
      }

      const requestUrl = `${API_URL}/admin/users?page=${page}&limit=${pagination.limit}${search ? `&search=${search}` : ''}`;
      console.log('3. Request details:', {
        url: requestUrl,
        method: 'GET',
        headers: {
          Authorization: 'Bearer [REDACTED]'
        },
        params: {
          page,
          limit: pagination.limit,
          search
        }
      });

      const response = await RequestHandler(
        requestUrl,
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );

      console.log('4. Raw API Response:', {
        type: typeof response,
        isObject: typeof response === 'object',
        keys: response ? Object.keys(response) : [],
        success: response?.success,
        hasData: !!response?.data,
        dataType: response?.data ? typeof response?.data : 'undefined',
        isObject: typeof response?.data === 'object',
        fullResponse: response
      });

      if (!response) {
        console.error('5. No response received');
        throw new Error('No response received from server');
      }

      if (response.success) {
        // Handle double-nested data structure
        const actualData = response.data?.data || response.data;
        
        console.log('6. Success response structure:', {
          hasData: !!actualData,
          dataType: typeof actualData,
          hasUsers: !!actualData?.users,
          usersIsArray: Array.isArray(actualData?.users),
          usersLength: actualData?.users?.length,
          hasPagination: !!actualData?.pagination
        });

        if (!actualData?.users || !Array.isArray(actualData.users)) {
          console.error('7. Invalid data format:', {
            hasData: !!actualData,
            hasUsers: !!actualData?.users,
            usersIsArray: Array.isArray(actualData?.users)
          });
          throw new Error('Invalid response format: missing users data');
        }

        console.log('8. Setting state with:', {
          userListLength: actualData.users.length,
          pagination: actualData.pagination
        });

        setUserList(actualData.users);
        setPagination({
          page: actualData.pagination.page,
          limit: actualData.pagination.limit,
          total: actualData.pagination.total,
          totalPages: actualData.pagination.totalPages
        });
      } else {
        console.error('9. Error response:', {
          message: response.message,
          success: response.success
        });
        throw new Error(response.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('10. Error caught:', {
        message: error.message,
        stack: error.stack,
        response: error.response,
        name: error.name
      });
      setError(error.message || 'Error fetching users');
      toast.error(error.message || 'Error fetching users');
    } finally {
      setLoading(false);
      console.log('11. Request completed');
    }
  };

  useEffect(() => {
    console.log('=== useEffect Debug ===');
    console.log('1. Effect triggered with:', {
      page: pagination.page,
      searchQuery,
      apiUrl: API_URL,
      loading,
      error
    });
    fetchUsers(pagination.page, searchQuery);
  }, [pagination.page, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on search
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleExport = () => {
    toast.success('Export functionality coming soon!');
  };

  return (
    <div className="text-themeblack md:w-3/4 mb-5">
      <div className="flex justify-between">
        <div className="text-base font-medium">Users</div>
        <Button
          type="button"
          className="rounded-full"
          onClick={handleExport}
        >
          Export
        </Button>
      </div>
      <hr className="my-2" />
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <div className="mb-4">
        <input
          type="text"
          name="search"
          autoComplete="new-password"
          autoCorrect="off"
          placeholder="Search for a user"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <>
      <UserList userList={userList} />
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </Button>
              <span className="py-2">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                disabled={pagination.page === pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserListSection;
