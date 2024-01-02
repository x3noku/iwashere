import Image, { type StaticImageData } from 'next/image';
import { type FC } from 'react';
import Heart from 'src/shared/assets/svg/heart.svg';
import { type PropsOf } from '~/shared/lib';
import { ButtonPrimary } from '../Button';

interface ProductCardProps extends PropsOf<'div'> {
    imager: StaticImageData;
    nameProduct: string;
    current: number;
    altImage: string;
}

export const ProductCard: FC<ProductCardProps> = ({ imager, altImage, current, nameProduct }) => {
    return (
        <div className='flex w-[308px] flex-col items-center'>
            <div className='solid relative mb-1 flex w-full flex-col rounded-5 border border-black bg-white'>
                <button className='absolute right-5 top-5'>
                    <Image alt='heart' src={Heart} />
                </button>
                <div className='mt-6 flex justify-center'>
                    <Image src={imager} alt={altImage} />
                </div>
                <div className='text-center text-19 font-400 text-black'>{current} ₽</div>
            </div>
            <div className='solid w-full rounded-5 border border-black bg-productname pb-6 pt-3 text-center text-20 text-black'>
                {nameProduct}
            </div>
            <ButtonPrimary type='buy' className='-translate-y-1/2 rounded-20 px-12  py-3 text-12'>
                В корзину
            </ButtonPrimary>
        </div>
    );
};
