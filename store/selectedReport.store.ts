import { create } from 'zustand';

interface selectedReport {
    selectedReport: string;
    setselectedReport: (data: string) => void;
}

const selectedReportStore = create<selectedReport>()((set) => ({
    selectedReport: 'Mandalay',
    setselectedReport: (data) => set((state) => ({ selectedReport: data })),
}));

export default selectedReportStore;
