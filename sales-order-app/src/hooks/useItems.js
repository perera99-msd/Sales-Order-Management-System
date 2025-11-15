import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemService } from '../services/itemService';
import { setLoading, setError, setItems } from '../redux/slices/itemSlice'; // Import the actions

export const useItems = () => {
  const dispatch = useDispatch();
  const itemsState = useSelector((state) => state.items);
  
  console.log('🔄 useItems - Redux items state:', itemsState);
  console.log('🔄 useItems - Items array:', itemsState.items);
  console.log('🔄 useItems - Items count:', itemsState.items?.length);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        dispatch(setLoading(true)); // Use the action creator
        const response = await itemService.getAll();
        console.log('📦 Items API Response:', response);
        console.log('📦 Items Data:', response.data);
        console.log('📦 Number of items:', response.data?.length);
        
        if (response.data && response.data.length > 0) {
          console.log('📦 First item sample:', response.data[0]);
          console.log('📦 All item codes:', response.data.map(item => item.itemCode));
        }
        
        dispatch(setItems(response.data)); // Use the action creator
      } catch (error) {
        console.error('❌ Error fetching items:', error);
        dispatch(setError(error.message)); // Use the action creator
      } finally {
        dispatch(setLoading(false)); // Use the action creator
      }
    };

    fetchItems();
  }, [dispatch]);

  return {
    items: itemsState.items || [],
    loading: itemsState.loading,
    error: itemsState.error,
  };
};