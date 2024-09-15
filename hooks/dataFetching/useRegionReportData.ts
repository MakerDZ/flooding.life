import fetchRegionReport from '@/actions/reports/fetchRegionReport.action';
import { useQuery } from '@tanstack/react-query';

const useRegionReportData = (region: string) => {
    const RegionReportQuery = async () => {
        const reportContent = await fetchRegionReport(region);
        return reportContent;
    };

    const {
        data: RegionReportData,
        isLoading: isRegionReportDataLoading,
        error: RegionReportDataError,
        refetch: RegionReportDataRefetch,
    } = useQuery({
        queryKey: [`RegionReportData-${region}`],
        queryFn: () => RegionReportQuery(),
        refetchOnMount: true,
    });

    return {
        RegionReportData,
        isRegionReportDataLoading,
        RegionReportDataError,
        RegionReportDataRefetch,
    };
};

export default useRegionReportData;
