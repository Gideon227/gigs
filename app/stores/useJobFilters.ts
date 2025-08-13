import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type JobFiltersState = {
  // filters
  keyword: string | null;
  location: string | null;
  country: string | null;
  state: string | null;
  city: string | null;

  // multi selects
  jobType: string[];
  skills: string[];
  workSettings: string[];

  // pagination
  page: number;
  pageSize: number;

  // internal
  isInitialized: boolean;

  // actions
  setKeyword: (k: string | null) => void;
  setLocation: (loc: string | null) => void;
  setCountry: (c: string | null) => void;
  clearLocationFilters: () => void;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;

  // initialize from URL and return whether default country was applied
  initFromSearchParams: (params: URLSearchParams) => boolean;

  // produce a URLSearchParams from current store
  toSearchParamsString: () => string;
};

export const useJobFilters = create<JobFiltersState>()(
  devtools((set, get) => ({
    keyword: null,
    location: null,
    country: null,
    state: null,
    city: null,

    jobType: [],
    skills: [],
    workSettings: [],

    page: 1,
    pageSize: 10,

    isInitialized: false,

    setKeyword: (k) => set(() => ({ keyword: k })),
    setLocation: (loc) => set(() => ({ location: loc, page: 1 })),
    setCountry: (c) => set(() => ({ country: c })),
    clearLocationFilters: () =>
      set(() => ({ location: null, country: null, state: null, city: null, page: 1 })),
    setPage: (p) => set(() => ({ page: p })),
    setPageSize: (s) => set(() => ({ pageSize: s })),

    initFromSearchParams: (params) => {
      const loc = params.get("location") || null;
      const country = params.get("country") || null;
      const state = params.get("state") || null;
      const city = params.get("city") || null;
      const keyword = params.get("keyword") || null;
      const page = Number(params.get("page") || 1);
      const pageSize = Number(params.get("limit") || params.get("pageSize") || 10);

      // multi-selects
      const jobType = params.getAll("jobType");
      const skills = params.getAll("skills");
      const workSettings = params.getAll("workSettings");

      set(() => ({
        location: loc,
        country: country,
        state,
        city,
        keyword,
        page,
        pageSize,
        jobType,
        skills,
        workSettings
      }));

      let defaultApplied = false;

      // only run this the first time initFromSearchParams is called
      if (!get().isInitialized) {
        if (!loc && !country) {
          // apply first-load default country
          set(() => ({ country: "United States" }));
          defaultApplied = true;
        }
        set(() => ({ isInitialized: true }));
      }

      return defaultApplied;
    },

    toSearchParamsString: () => {
      const s = get();
      const params = new URLSearchParams();

      if (s.keyword) params.set("keyword", s.keyword);
      if (s.location) params.set("location", s.location);
      if (s.country) params.set("country", s.country);
      if (s.state) params.set("state", s.state);
      if (s.city) params.set("city", s.city);

      s.jobType.forEach((v) => params.append("jobType", v));
      s.skills.forEach((v) => params.append("skills", v));
      s.workSettings.forEach((v) => params.append("workSettings", v));

      params.set("page", String(s.page || 1));
      params.set("limit", String(s.pageSize || 10));

      return params.toString();
    }
  }))
);
