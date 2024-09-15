import getLettersAction from '@/actions/wishLetter/getLetters.action';
import { useQuery } from '@tanstack/react-query';

const useWishLetterData = () => {
    const WishLetterQuery = async () => {
        const WishLetter = await getLettersAction();
        return WishLetter;
    };

    const {
        data: WishLetterData,
        isLoading: isWishLetterDataLoading,
        error: WishLetterDataError,
        refetch: WishLetterDataRefetch,
    } = useQuery({
        queryKey: [`WishLetterData`],
        queryFn: () => WishLetterQuery(),
        refetchOnMount: true,
    });

    return {
        WishLetterData,
        isWishLetterDataLoading,
        WishLetterDataError,
        WishLetterDataRefetch,
    };
};

export default useWishLetterData;
