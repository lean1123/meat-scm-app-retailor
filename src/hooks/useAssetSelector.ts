import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asset } from '../api/retailorApi';
import { IAsset } from '../types/asset';

interface UpdateStorageDetails {
  ownerOrgName: string;
  facilityName: string;
  note: string;
}

interface SplitToUnitsDetails {
  parentAssetID: string;
  unitCount: number;
  unitIDPrefix: string;
}

interface AssetState {
  assets: IAsset[];
  selectedAsset: IAsset | null;
  selectedAssetIds: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  operationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  operationError: string | null;
}

const initialState: AssetState = {
  assets: [],
  selectedAsset: null,
  selectedAssetIds: [],
  status: 'idle',
  error: null,
  operationStatus: 'idle',
  operationError: null,
};

// Async thunks for API calls
export const fetchAssets = createAsyncThunk(
  'asset/fetchAssets',
  async (facilityId: string, { rejectWithValue }) => {
    try {
      const response = await asset.fetchAssetByFacilityID(facilityId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assets');
    }
  },
);

export const updateStoragePosition = createAsyncThunk(
  'asset/updateStoragePosition',
  async (
    { prodID, details }: { prodID: string; details: UpdateStorageDetails },
    { rejectWithValue },
  ) => {
    try {
      const res = await asset.updateStorage(prodID, details);
      return res.data;
    } catch (error) {
      console.error('Error updating storage position:', error);
      return rejectWithValue('Failed to update storage position');
    }
  },
);

export const splitToUnits = createAsyncThunk(
  'asset/splitToUnits',
  async (details: SplitToUnitsDetails, { rejectWithValue }) => {
    try {
      const res = await asset.splitToUnits(details);
      return res.data;
    } catch (error) {
      console.error('Error splitting to units:', error);
      return rejectWithValue('Failed to split to units');
    }
  },
);

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    // Selection reducers
    selectAsset: (state, action: PayloadAction<string>) => {
      const assetId = action.payload;
      const asset = state.assets.find((a) => a.assetID === assetId);
      if (asset) {
        state.selectedAsset = asset;
        if (!state.selectedAssetIds.includes(assetId)) {
          state.selectedAssetIds.push(assetId);
        }
      }
    },

    deselectAsset: (state, action: PayloadAction<string>) => {
      const assetId = action.payload;
      state.selectedAssetIds = state.selectedAssetIds.filter((id) => id !== assetId);
      if (state.selectedAsset?.assetID === assetId) {
        state.selectedAsset = null;
      }
    },

    toggleAssetSelection: (state, action: PayloadAction<string>) => {
      const assetId = action.payload;
      const isSelected = state.selectedAssetIds.includes(assetId);

      if (isSelected) {
        state.selectedAssetIds = state.selectedAssetIds.filter((id) => id !== assetId);
        if (state.selectedAsset?.assetID === assetId) {
          state.selectedAsset = null;
        }
      } else {
        const asset = state.assets.find((a) => a.assetID === assetId);
        if (asset) {
          state.selectedAssetIds.push(assetId);
          state.selectedAsset = asset;
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch assets
      .addCase(fetchAssets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action: PayloadAction<IAsset[]>) => {
        state.status = 'succeeded';
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Update storage position
      .addCase(updateStoragePosition.pending, (state) => {
        state.operationStatus = 'loading';
        state.operationError = null;
      })
      .addCase(updateStoragePosition.fulfilled, (state, action: PayloadAction<IAsset>) => {
        state.operationStatus = 'succeeded';
        const updatedAsset = action.payload;
        const index = state.assets.findIndex((a) => a.assetID === updatedAsset.assetID);
        if (index !== -1) {
          state.assets[index] = updatedAsset;
          if (state.selectedAsset?.assetID === updatedAsset.assetID) {
            state.selectedAsset = updatedAsset;
          }
        }
      })
      .addCase(updateStoragePosition.rejected, (state, action) => {
        state.operationStatus = 'failed';
        state.operationError = action.payload as string;
      })
      // Split to units
      .addCase(splitToUnits.pending, (state) => {
        state.operationStatus = 'loading';
        state.operationError = null;
      })
      .addCase(splitToUnits.fulfilled, (state, action: PayloadAction<IAsset[]>) => {
        state.operationStatus = 'succeeded';
        const newUnits = action.payload;
        state.assets.push(...newUnits);
      })
      .addCase(splitToUnits.rejected, (state, action) => {
        state.operationStatus = 'failed';
        state.operationError = action.payload as string;
      });
  },
});

export const { selectAsset, deselectAsset, toggleAssetSelection } = assetSlice.actions;

export default assetSlice.reducer;
