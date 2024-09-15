'use client';

import React, { useEffect } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import {
    createWishLetterSchema,
    TypeCreateWishLetterSchema,
} from '@/validations/wishLetter.validation';
import createWishLetterAction from '@/actions/wishLetter/createLetter.action';
import { Spinner } from '@nextui-org/spinner';
import useDonorData from '@/hooks/dataFetching/useDonorData';

interface ModalProp {
    closeIt?: any;
    isOpen: any;
    onOpenChange: any;
    data?: any;
}

export const WriteWishModal = (prop: ModalProp) => {
    const { execute, status, result } = useAction(createWishLetterAction);
    const { DonorDataRefetch } = useDonorData();

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        register,
    } = useForm<TypeCreateWishLetterSchema>({
        resolver: zodResolver(createWishLetterSchema),
    });

    const onSubmit = async (data: TypeCreateWishLetterSchema) => {
        console.log(data);
        execute(data);
    };

    useEffect(() => {
        if (result.data?.status == 'success') {
            //update the query cache.
            DonorDataRefetch();
            prop.closeIt();
        } else if (result.data?.status == 'failed') {
            //toast.error('Failed to update service profile.');
            console.log(result.data.data);
        }
    }, [result]);

    return (
        <Modal
            placement="center"
            isOpen={prop.isOpen}
            onOpenChange={prop.onOpenChange}
            onClose={prop.closeIt}
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">
                            <p className="text-base text-[#505461] font-bold">
                                Write A Wish
                            </p>
                        </ModalHeader>
                        <ModalBody className="space-y-3">
                            <Input
                                {...register('name')}
                                type="text"
                                label="Name"
                                placeholder="Enter your desired name"
                            />
                            <Input
                                {...register('socialLink')}
                                type="text"
                                label="Link related to you (optional)"
                                placeholder="Enter the link you want to attach to your letter"
                            />
                            <Textarea
                                {...register('letter')}
                                label="Wish Letter"
                                placeholder="Own a piece of history in floating crisis donations."
                                minRows={4}
                                maxRows={5}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                isDisabled={
                                    isSubmitting || status == 'executing'
                                }
                                type="submit"
                                className={`z-10 font-bold bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ${isSubmitting || status == 'executing' ? 'opacity-60' : ''}`}
                            >
                                {isSubmitting || status == 'executing' ? (
                                    <Spinner
                                        color="white"
                                        size="sm"
                                        className="mx-auto"
                                    />
                                ) : (
                                    <>Create History</>
                                )}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};