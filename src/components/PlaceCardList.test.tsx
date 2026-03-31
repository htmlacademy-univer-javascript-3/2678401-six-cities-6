import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {OfferType} from '../domain/dto/offer.ts';
import PlaceCardList from './PlaceCardList.tsx';

describe('OffersList component', () => {
  it('should render empty list when offers array is empty', () => {
    const offers: OfferType[] = [];

    const {container} = render(<PlaceCardList offers={offers}/>);

    expect(container.querySelector('.places__list')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
