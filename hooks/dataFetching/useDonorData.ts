import sendAIDValidate from '@/actions/home/sendAID.action';
import { useQuery } from '@tanstack/react-query';

const useDonorData = () => {
    const DonorQuery = async () => {
        const donor = await sendAIDValidate();
        return donor;
    };

    const {
        data: DonorData,
        isLoading: isDonorDataLoading,
        error: DonorDataError,
        refetch: DonorDataRefetch,
    } = useQuery({
        queryKey: [`DonorData`],
        queryFn: () => DonorQuery(),
        refetchOnMount: true,
    });

    return {
        DonorData,
        isDonorDataLoading,
        DonorDataError,
        DonorDataRefetch,
    };
};

export default useDonorData;
