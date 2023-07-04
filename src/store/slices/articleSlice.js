import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

const initialState = { loading: false, data: [], error: null };

const url = (articleUrl) => {
  return `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(
    articleUrl
  )}&length=3`;
};
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": rapidApiKey,
    "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
  },
};

export const fetchArticles = createAsyncThunk(
  "posts/fetchPosts",
  async (articleUrl, { rejectWithValue }) => {
    try {
      const response = await fetch(url(articleUrl), options);
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Posts
    builder.addCase(fetchArticles.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {} = articleSlice.actions;
export default articleSlice.reducer;
