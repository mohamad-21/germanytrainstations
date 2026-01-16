import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, type Mock } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../contexts/ContextProvider', () => {
	return {
		useStationsContext: vi.fn(),
		StationsProvider: ({ children }: any) => React.createElement(React.Fragment, null, children),
	};
});

import StationsList from '../components/StationsList';
import { useStationsContext } from '../contexts/ContextProvider';

const mockedUseStationsContext = useStationsContext as unknown as Mock;

const mockStations = [
	{ id: '1', name: 'Berlin Hbf', city: 'Berlin' },
	{ id: '2', name: 'Munich Hbf', city: 'Munich' },
	{ id: '3', name: 'Berlin Ost', city: 'Berlin' },
];

describe('stations data and filtering', () => {
	it('renders all stations then filters by city', () => {
		mockedUseStationsContext.mockReturnValue({
			stations: mockStations,
			filteredStations: mockStations,
			selectedCity: 'All',
			setSelectedCity: vi.fn(),
			cities: ['All', 'Berlin', 'Munich'],
		});

		const { rerender } = render(<StationsList />);
		expect(screen.getAllByRole('listitem')).toHaveLength(3);

		mockedUseStationsContext.mockReturnValue({
			stations: mockStations,
			filteredStations: mockStations.filter(s => s.city === 'Berlin'),
			selectedCity: 'Berlin',
			setSelectedCity: vi.fn(),
			cities: ['All', 'Berlin', 'Munich'],
		});

		rerender(<StationsList />);
		expect(screen.getAllByRole('listitem')).toHaveLength(2);
		expect(screen.getByText('Berlin Hbf')).toBeInTheDocument();
	});
});